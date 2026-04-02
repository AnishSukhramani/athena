const DEFAULT_LINKEDIN_VERSION = '202411';

function linkedinVersionHeader() {
  return process.env.LINKEDIN_REST_VERSION?.trim() || DEFAULT_LINKEDIN_VERSION;
}

export type LinkedInPublishInput = {
  authorUrn: string;
  accessToken: string;
  postType: 'text' | 'link_article' | 'image' | 'video';
  content: string;
  articleUrl?: string | null;
  articleTitle?: string | null;
  articleDescription?: string | null;
  mediaUrls: string[];
};

export type PublishResult = { ok: true; platformPostId: string } | { ok: false; message: string };

function restHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'LinkedIn-Version': linkedinVersionHeader(),
    'X-Restli-Protocol-Version': '2.0.0',
  };
}

/** Text-only post (LinkedIn Posts API). */
export async function publishLinkedInText(input: LinkedInPublishInput): Promise<PublishResult> {
  if (input.postType !== 'text') {
    return { ok: false, message: 'Internal: use publishLinkedInArticle for link_article' };
  }

  const body = {
    author: input.authorUrn,
    commentary: input.content.slice(0, 3000),
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [] as unknown[],
      externalDistributionChannels: [] as unknown[],
    },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
  };

  try {
    const res = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: restHeaders(input.accessToken),
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let j: { id?: string; message?: string; error?: string } = {};
    try {
      j = JSON.parse(text) as typeof j;
    } catch {
      /* non-json */
    }

    if (!res.ok) {
      return { ok: false, message: j.message || j.error || text || res.statusText };
    }

    const postId = res.headers.get('x-restli-id') || j.id;
    if (!postId) {
      return { ok: false, message: text || 'No post id in response' };
    }
    return { ok: true, platformPostId: postId };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, message: msg };
  }
}

/** Article / link share with optional title and description. */
export async function publishLinkedInArticle(input: LinkedInPublishInput): Promise<PublishResult> {
  if (input.postType !== 'link_article') {
    return { ok: false, message: 'Internal: wrong post type' };
  }
  if (!input.articleUrl?.trim()) {
    return { ok: false, message: 'article_url is required' };
  }

  const body = {
    author: input.authorUrn,
    commentary: input.content.slice(0, 3000),
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [] as unknown[],
      externalDistributionChannels: [] as unknown[],
    },
    content: {
      article: {
        source: input.articleUrl.trim(),
        title: input.articleTitle?.trim() || undefined,
        description: input.articleDescription?.trim() || undefined,
      },
    },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
  };

  try {
    const res = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: restHeaders(input.accessToken),
      body: JSON.stringify(body),
    });

    const text = await res.text();
    if (!res.ok) {
      return { ok: false, message: text || res.statusText };
    }

    const postId = res.headers.get('x-restli-id');
    if (!postId) {
      return { ok: false, message: text || 'No post id in response' };
    }
    return { ok: true, platformPostId: postId };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, message: msg };
  }
}

/**
 * Register image with LinkedIn, upload bytes from a public URL, create a single-image post.
 */
export async function publishLinkedInImage(input: LinkedInPublishInput): Promise<PublishResult> {
  if (input.postType !== 'image') {
    return { ok: false, message: 'Internal: wrong post type' };
  }
  const src = input.mediaUrls[0];
  if (!src) return { ok: false, message: 'media_urls[0] required' };

  try {
    const imgRes = await fetch(src);
    if (!imgRes.ok) {
      return { ok: false, message: `Failed to fetch image: ${imgRes.status}` };
    }
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';

    const registerBody = {
      registerUploadRequest: {
        recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
        owner: input.authorUrn,
        serviceRelationships: [
          {
            relationshipType: 'OWNER',
            identifier: 'urn:li:userGeneratedContent',
          },
        ],
      },
    };

    const reg = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
      method: 'POST',
      headers: restHeaders(input.accessToken),
      body: JSON.stringify(registerBody),
    });
    const regJson = (await reg.json()) as {
      value?: {
        uploadMechanism?: {
          'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'?: { uploadUrl?: string; headers?: Record<string, string> };
        };
        asset?: string;
      };
    };

    if (!reg.ok) {
      return { ok: false, message: JSON.stringify(regJson) };
    }

    const mech = regJson.value?.uploadMechanism?.['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'];
    const uploadUrl = mech?.uploadUrl;
    const asset = regJson.value?.asset;
    if (!uploadUrl || !asset) {
      return { ok: false, message: 'registerUpload missing uploadUrl or asset' };
    }

    const uploadHeaders: Record<string, string> = { 'Content-Type': contentType };
    if (mech?.headers) {
      Object.assign(uploadHeaders, mech.headers);
    }

    const up = await fetch(uploadUrl, {
      method: 'PUT',
      headers: uploadHeaders,
      body: buffer,
    });
    if (!up.ok) {
      const t = await up.text();
      return { ok: false, message: `Upload failed: ${t}` };
    }

    const postBody = {
      author: input.authorUrn,
      commentary: input.content.slice(0, 3000),
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [] as unknown[],
        externalDistributionChannels: [] as unknown[],
      },
      content: {
        media: {
          id: asset,
        },
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    };

    const postRes = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: restHeaders(input.accessToken),
      body: JSON.stringify(postBody),
    });
    const postText = await postRes.text();
    if (!postRes.ok) {
      return { ok: false, message: postText || postRes.statusText };
    }
    const postId = postRes.headers.get('x-restli-id');
    if (!postId) return { ok: false, message: postText };
    return { ok: true, platformPostId: postId };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, message: msg };
  }
}

/** Video: not implemented — Graph-style file_url is not supported the same way on LinkedIn. */
export async function publishLinkedInVideo(input: LinkedInPublishInput): Promise<PublishResult> {
  if (input.postType !== 'video') {
    return { ok: false, message: 'Internal: wrong post type' };
  }
  return {
    ok: false,
    message:
      'LinkedIn video posts require multi-step upload (initializeUpload → parts → finalize). Not implemented in this build.',
  };
}

export async function publishToLinkedIn(input: LinkedInPublishInput): Promise<PublishResult> {
  switch (input.postType) {
    case 'text':
      return publishLinkedInText(input);
    case 'link_article':
      return publishLinkedInArticle(input);
    case 'image':
      return publishLinkedInImage(input);
    case 'video':
      return publishLinkedInVideo(input);
    default:
      return { ok: false, message: `Unsupported type: ${input.postType}` };
  }
}

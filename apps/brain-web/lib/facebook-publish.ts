const DEFAULT_VERSION = 'v21.0';

function graphVersion() {
  return process.env.FACEBOOK_GRAPH_API_VERSION?.trim() || DEFAULT_VERSION;
}

export type FacebookPublishInput = {
  pageId: string;
  accessToken: string;
  postType: 'text' | 'link_article' | 'image' | 'video';
  content: string;
  articleUrl?: string | null;
  mediaUrls: string[];
};

export type PublishResult = { ok: true; platformPostId: string } | { ok: false; message: string };

export async function publishToFacebook(input: FacebookPublishInput): Promise<PublishResult> {
  const v = graphVersion();
  const base = `https://graph.facebook.com/${v}`;
  const token = input.accessToken;

  try {
    if (input.postType === 'text') {
      const body = new URLSearchParams({
        message: input.content,
        access_token: token,
      });
      const res = await fetch(`${base}/${input.pageId}/feed`, {
        method: 'POST',
        body,
      });
      const j = (await res.json()) as { id?: string; error?: { message?: string } };
      if (!res.ok || !j.id) {
        return { ok: false, message: j.error?.message || JSON.stringify(j) };
      }
      return { ok: true, platformPostId: j.id };
    }

    if (input.postType === 'link_article') {
      if (!input.articleUrl?.trim()) {
        return { ok: false, message: 'article_url is required for link posts' };
      }
      const body = new URLSearchParams({
        message: input.content,
        link: input.articleUrl.trim(),
        access_token: token,
      });
      const res = await fetch(`${base}/${input.pageId}/feed`, {
        method: 'POST',
        body,
      });
      const j = (await res.json()) as { id?: string; error?: { message?: string } };
      if (!res.ok || !j.id) {
        return { ok: false, message: j.error?.message || JSON.stringify(j) };
      }
      return { ok: true, platformPostId: j.id };
    }

    if (input.postType === 'image') {
      const url = input.mediaUrls[0];
      if (!url) return { ok: false, message: 'media_urls[0] required for image post' };
      const body = new URLSearchParams({
        url,
        caption: input.content,
        access_token: token,
      });
      const res = await fetch(`${base}/${input.pageId}/photos`, {
        method: 'POST',
        body,
      });
      const j = (await res.json()) as { id?: string; post_id?: string; error?: { message?: string } };
      if (!res.ok) {
        return { ok: false, message: j.error?.message || JSON.stringify(j) };
      }
      const id = j.post_id || j.id;
      if (!id) return { ok: false, message: JSON.stringify(j) };
      return { ok: true, platformPostId: String(id) };
    }

    if (input.postType === 'video') {
      const fileUrl = input.mediaUrls[0];
      if (!fileUrl) return { ok: false, message: 'media_urls[0] required for video post' };
      const body = new URLSearchParams({
        file_url: fileUrl,
        description: input.content,
        access_token: token,
      });
      const res = await fetch(`${base}/${input.pageId}/videos`, {
        method: 'POST',
        body,
      });
      const j = (await res.json()) as { id?: string; error?: { message?: string } };
      if (!res.ok || !j.id) {
        return { ok: false, message: j.error?.message || JSON.stringify(j) };
      }
      return { ok: true, platformPostId: j.id };
    }

    return { ok: false, message: `Unsupported post type: ${input.postType}` };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, message: msg };
  }
}

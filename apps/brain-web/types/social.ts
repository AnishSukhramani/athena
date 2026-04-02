export type SocialPlatform = 'facebook' | 'linkedin';

export type SocialPostType = 'text' | 'link_article' | 'image' | 'video';

export type SocialPostStatus = 'draft' | 'published' | 'failed';

export type SocialAccountRow = {
  id: string;
  platform: SocialPlatform;
  account_id: string;
  account_name: string;
  access_token: string;
  token_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type SocialPostRow = {
  id: string;
  post_type: SocialPostType;
  target_platforms: string[];
  content: string;
  media_urls: string[];
  article_url: string | null;
  article_title: string | null;
  article_description: string | null;
  status: SocialPostStatus;
  created_at: string;
  updated_at: string;
};

export type SocialPostResultRow = {
  id: string;
  post_id: string;
  platform: SocialPlatform;
  platform_post_id: string | null;
  status_message: string | null;
  created_at: string;
};

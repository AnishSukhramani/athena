import { z } from 'zod';

export const platformSchema = z.enum(['facebook', 'linkedin']);
export const postTypeSchema = z.enum(['text', 'link_article', 'image', 'video']);
export const postStatusSchema = z.enum(['draft', 'published', 'failed']);

export const createPostBodySchema = z
  .object({
    post_type: postTypeSchema,
    target_platforms: z.array(platformSchema).min(1),
    content: z.string().max(12000).default(''),
    media_urls: z.array(z.string().min(1)).default([]),
    article_url: z.string().max(2000).optional().nullable(),
    article_title: z.string().max(500).optional().nullable(),
    article_description: z.string().max(2000).optional().nullable(),
    status: postStatusSchema.optional().default('draft'),
  })
;

export const updatePostBodySchema = createPostBodySchema.partial().extend({
  post_type: postTypeSchema.optional(),
  target_platforms: z.array(platformSchema).min(1).optional(),
});

export type CreatePostBody = z.infer<typeof createPostBodySchema>;
export type UpdatePostBody = z.infer<typeof updatePostBodySchema>;

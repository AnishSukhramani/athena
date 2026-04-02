export const OUTPUT_CHANNELS = [
  { id: 'facebook', label: 'Facebook', path: '/output/facebook' as const },
  { id: 'linkedin', label: 'LinkedIn', path: '/output/linkedin' as const },
  { id: 'email', label: 'Email', path: '/output/email' as const },
  { id: 'blog', label: 'Blog / Newsletter', path: '/output/blog' as const },
] as const;

export type OutputChannelId = (typeof OUTPUT_CHANNELS)[number]['id'];

import * as React from 'react';

import { cn } from '@/lib/utils';

export const textareaClassName = cn(
  'min-h-[100px] w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 font-sans text-sm transition-colors outline-none',
  'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  'disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30'
);

export function TextareaField({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(textareaClassName, className)} {...props} />;
}

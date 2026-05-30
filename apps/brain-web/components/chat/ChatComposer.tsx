'use client';

import { useState } from 'react';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

type ChatComposerProps = {
  busy: boolean;
  disabled?: boolean;
  onSend: (message: string) => Promise<void> | void;
  className?: string;
};

export function ChatComposer({ busy, disabled = false, onSend, className }: ChatComposerProps) {
  const [value, setValue] = useState('');

  const submit = async () => {
    const next = value.trim();
    if (!next || busy || disabled) return;
    setValue('');
    await onSend(next);
  };

  return (
    <div className={className}>
      <PlaceholdersAndVanishInput
        placeholders={[
          'Ask about top opportunities this week',
          'Which practices show strongest front desk demand?',
          'What changed in recent job signals?',
          'Which competitors are increasing ad activity?',
          'Summarize actionable next steps for our team',
        ]}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      />
    </div>
  );
}

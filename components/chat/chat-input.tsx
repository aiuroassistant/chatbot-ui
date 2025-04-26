'use client';

import { useState } from 'react';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { useChatStore } from '@/store/chat';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const { appendMessage } = useChatStore();
  const { formRef, onKeyDown } = useEnterSubmit();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    appendMessage({ role: 'user', content: input.trim() });
    setInput('');
  };

  return (
    <div className="px-4 py-2 border-t">
      <form onSubmit={handleSubmit} ref={formRef} className="flex flex-row gap-3">
        <input
          className="flex-grow p-2 border rounded"
          type="text"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useChatStore } from '@/store/chat';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';

export default function ChatInput() {
  const [symptom, setSymptom] = useState('');
  const [history, setHistory] = useState('');
  const [concerns, setConcerns] = useState('');
  const { appendMessage } = useChatStore();
  const { formRef, onKeyDown } = useEnterSubmit();

  const generatePrompt = () => {
    return `
Patient Symptom Description: ${symptom}
Relevant Recent Procedure / History: ${history}
Concerning Symptoms: ${concerns}

Please provide:
1. A concise Clinical Recommendation (1-2 sentences)
2. A clear Patient Message (as if for MyChart or call-back)
3. An EMR Note ready for copy-paste into chart

**Disclaimer:** This response was generated with AI assistance based on provided clinical details and internal protocols. Final clinical decisions should be made by a licensed healthcare provider.
    `;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const prompt = generatePrompt();

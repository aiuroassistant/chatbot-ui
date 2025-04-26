'use client';

import { useState } from 'react';

export function ChatInput() {
  const [symptom, setSymptom] = useState('');
  const [history, setHistory] = useState('');
  const [concerns, setConcerns] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const generatePrompt = () => {
    return `
**Patient Symptom Description:** ${symptom}

**Relevant Recent Procedure / History:** ${history}

**Concerning Symptoms (if any):** ${concerns}

---
Please provide:
1. A concise Clinical Recommendation (1-2 sentences)
2. A clear Patient Message (as if for MyChart or call-back)
3. An EMR Note ready for copy-paste into chart

---
**Disclaimer:** This response was generated with AI assistance based on provided clinical details and internal protocols. Final clinical decisions should be made by a licensed healthcare provider.
    `;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = generatePrompt();
    setMessages((prevMessages) => [...prevMessages, prompt]);
    setSymptom('');
    setHistory('');
    setConcerns('');
  };

  return (
    <div className="px-4 py-2 border-t">
      <h2 className="text-xl font-bold mb-4">Nurse Triage Assistant</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="What symptom is the patient reporting?"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Any recent surgeries, catheters, procedures?"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Any severe symptoms like fever, blood clots, severe pain?"
          value={concerns}
          onChange={(e) => setConcerns(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate
        </button>
      </form>
    </div>
  );
}

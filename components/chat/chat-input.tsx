'use client';

import { useState } from 'react';

export function ChatInput() {
  const [symptom, setSymptom] = useState('');
  const [history, setHistory] = useState('');
  const [concerns, setConcerns] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = `
You are a Nurse Triage Assistant for a Urology clinic.
Base your responses on these clinic protocols:
- Hematuria after stent removal: monitor unless clot retention or fever.
- Urinary retention post-surgery: advise immediate ER visit.
- Mild urinary urgency/frequency: monitor, avoid caffeine.
- Constipation post-op: manage with OTC meds unless severe pain/obstruction signs.
- Stent discomfort: manage with hydration, bladder relaxants unless fever/obstruction.

Patient Details:
- Symptom: ${symptom}
- Relevant History/Procedure: ${history}
- Concerning Symptoms: ${concerns}

Please generate:
1. Clinical Recommendation (1-2 sentences)
2. Patient Message (for call/MyChart)
3. EMR Note (for documentation)

---
**Disclaimer:** This response was generated with AI assistance based on clinic protocols. Final clinical decisions are made by licensed healthcare providers.
`;
    setMessages(prev => [...prev, prompt]);
    setSymptom('');
    setHistory('');
    setConcerns('');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-2">Nurse Triage Assistant</h2>
      <p className="mb-4">
        Welcome! Please enter the patient’s information below.{' '}
        <a href="/quickstart.pdf" target="_blank" className="text-blue-600 underline">
          View Quickstart Guide
        </a>
      </p>
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
          placeholder="Any severe symptoms like fever, clots, severe pain?"
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
      <div className="mt-6 space-y-6">
        {messages.map((message, idx) => (
          <div key={idx} className="border p-4 rounded">
            <p className="whitespace-pre-line">{message}</p>
            <button
              onClick={() => handleCopy(message

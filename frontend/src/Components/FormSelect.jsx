import React from 'react';

export const orderedLabels = {
  "Aggression": "How often do you feel angry or aggressive?",
  "Agitation": "Do you feel agitated or restless often?",
  "Appetite": "How has your appetite changed recently?",
  "Concentration": "How would you describe your concentration levels?",  
  "Fatigue": "How often do you feel fatigued?",
  "Hopelessness": "How often do you feel hopeless about your situation or future?",
  "Interest": "How interested do you feel in things you used to enjoy?",
  "Low Energy": "How would you describe your energy levels throughout the day?",
  "Panic Attacks": "Do you experience panic attacks?",
  "Restlessness": "How often do you feel restless during the day?",
  "Sleep": "On average, how much do you sleep per night?",
  "Sleep Disturbance": "Do you experience sleep disturbances?",
  "Suicidal Ideation": "How often do you experience thoughts of self-harm or suicide?",
  "Worthlessness": "How often do you struggle with feelings of worthlessness?"
};

export default function FormSelect({ label, value, options, onChange }) {
  return (
    <div className="w-full">
      <label className="block mb-1 font-medium text-[var(--text)]">
        {label}
      </label>
      <select
        className="w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select --</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

import React, { useState } from "react";
import EnergyAndAppetite from "../Components/EnergyAndAppetite";
import SleepAndRestlessness from "../Components/SleepAndRestlessness";
import MoodAndEmotionalWellbeing from "../Components/MoodAndEmotionalWellbeing";
import CognitiveAndSafety from "../Components/CognitiveAndSafety";
import Submit from "../Components/Submit";
import { options, labels } from "../assets/mappings";

const steps = [
  { label: "Energy & Appetite", component: EnergyAndAppetite },
  { label: "Sleep & Restlessness", component: SleepAndRestlessness },
  { label: "Mood & Emotional Well-being", component: MoodAndEmotionalWellbeing },
  { label: "Cognitive & Safety", component: CognitiveAndSafety },
  { label: "Submit", component: Submit },
];

export default function SurveyStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const StepComponent = steps[currentStep].component;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://mental-diagnosis.onrender.com//predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("Prediction: " + (result.diagnosis || "Unknown"));
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRandomFill = () => {
    const randomData = {};
    for (const key in options) {
      const optList = options[key];
      const randomValue = optList[Math.floor(Math.random() * optList.length)];
      randomData[key] = randomValue;
    }
    setFormData(randomData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow bg-white space-y-6">
      <div className="text-lg font-semibold text-blue-600">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
      </div>

      <StepComponent
        formData={formData}
        setFormData={setFormData}
        {...(currentStep === steps.length - 1 ? { onSubmit: handleSubmit, isSubmitting } : {})}
      />

      <div className="flex justify-between pt-4 items-center">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 0 || isSubmitting}
        >
          Back
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={isSubmitting}
          >
            Next
          </button>
        ) : null}

        <button
          className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleRandomFill}
        >
          Fill Randomly
        </button>
      </div>
    </div>
  );
}

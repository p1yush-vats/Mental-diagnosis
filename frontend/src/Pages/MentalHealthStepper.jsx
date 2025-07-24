import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormSelect from '../Components/FormSelect';
import { Button } from '../Components/ui/button';
import { Progress } from '../Components/ui/progress';
import { motion } from 'framer-motion';
import { orderedLabels } from '../Components/FormSelect';

const BATCH_SIZE = 4;

export default function MentalHealthStepper() {
  const [labelOptions, setLabelOptions] = useState({});
  const [formData, setFormData] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const allKeysOrdered = Object.keys(orderedLabels).filter(key => key in labelOptions);
  const totalSteps = Math.ceil(allKeysOrdered.length / BATCH_SIZE);
  const currentKeys = allKeysOrdered.slice(stepIndex * BATCH_SIZE, (stepIndex + 1) * BATCH_SIZE);

  useEffect(() => {
    axios.get('https://mental-diagnosis.onrender.com/label-options')
      .then(res => {
        setLabelOptions(res.data);
        const initialData = {};
        for (const key of Object.keys(res.data)) {
          if (key !== 'Depression State') {
            initialData[key] = '';
          }
        }
        setFormData(initialData);
      });
  }, []);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleRandomFill = () => {
    const randomData = { ...formData };
    for (const key of currentKeys) {
      const options = labelOptions[key];
      if (options && options.length > 0) {
        const rand = Math.floor(Math.random() * options.length);
        randomData[key] = options[rand];
      }
    }
    setFormData(randomData);
  };

  const handleSubmit = () => {
    setLoading(true);
    const inputFeatures = { ...formData };
    delete inputFeatures['Depression State'];

    axios.post('https://mental-diagnosis.onrender.com/predict', inputFeatures)
      .then(res => {
        setResult(res.data.diagnosis);
        setConfidence(res.data.confidence);
      })
      .catch(err => {
        setResult('Error: ' + (err.response?.data?.error || err.message));
        setConfidence(null);
      })
      .finally(() => setLoading(false));
  };

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) setStepIndex(prev => prev + 1);
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(prev => prev - 1);
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🧠 Mental Health Survey</h1>

        <Progress value={((stepIndex + 1) / totalSteps) * 100} className="mb-6 h-4 rounded" />

        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6 bg-[var(--card-bg)] p-6 rounded-lg shadow-md transition-colors duration-300"
        >
          {currentKeys.map(key => (
            <FormSelect
              key={key}
              label={orderedLabels[key]}
              options={labelOptions[key] || []}
              value={formData[key]}
              onChange={(value) => handleChange(key, value)}
            />
          ))}
        </motion.div>

        <div className="flex justify-between mt-8">
          <Button onClick={handleBack} disabled={stepIndex === 0} variant="outline">
            ⬅ Back
          </Button>

          {stepIndex < totalSteps - 1 ? (
            <div className="space-x-2">
              <Button onClick={handleRandomFill} variant="secondary">
                🎲 Fill Random
              </Button>
              <Button onClick={handleNext} className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white">
                Next ➡
              </Button>
            </div>
          ) : (
            <div className="space-x-2">
              <Button onClick={handleRandomFill} variant="secondary">
                🎲 Fill Random
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
              >
                {loading ? 'Predicting...' : 'Submit'}
              </Button>
            </div>
          )}
        </div>

        {result && (
          <div className="mt-6 p-4 bg-[var(--result-bg)] border border-[var(--result-border)] text-[var(--result-text)] rounded shadow transition-colors duration-300">
            <strong>Prediction:</strong> {result}
            {confidence !== null && (
              <p>
                There&apos;s <strong>{confidence}%</strong> chance that you are suffering from <strong>{result}</strong> depression.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

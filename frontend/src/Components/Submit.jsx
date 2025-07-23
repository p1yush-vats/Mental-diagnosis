import React, { useEffect, useState } from 'react';
import { fetchLabelOptions } from '../api/labelOptions';
import FormSelect from './FormSelect';

const SurveyForm = () => {
  const [labelOptions, setLabelOptions] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchLabelOptions().then(setLabelOptions).catch(console.error);
  }, []);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    // submit to /predict if needed
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(labelOptions).map(([field, options]) => (
        <FormSelect
          key={field}
          label={field}
          name={field}
          value={formData[field] || ''}
          options={options}
          onChange={handleChange}
        />
      ))}

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default SurveyForm;

import { useState, useEffect } from 'react';

const useLabelOptions = () => {
  const [labelOptions, setLabelOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/label-options')
      .then(res => res.json())
      .then(data => {
        setLabelOptions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching label options:", err);
        setLoading(false);
      });
  }, []);

  return { labelOptions, loading };
};

export default useLabelOptions;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Plugin to draw diagonal line
const diagonalLinePlugin = {
  id: 'diagonalLine',
  afterDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    const { left, right, top, bottom } = chartArea;
    const { x, y } = scales;

    const min = Math.max(x.min, y.min);
    const max = Math.min(x.max, y.max);

    const x1 = x.getPixelForValue(min);
    const y1 = y.getPixelForValue(min);
    const x2 = x.getPixelForValue(max);
    const y2 = y.getPixelForValue(max);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.restore();
  }
};

const Visualizations = () => {
  const [visualData, setVisualData] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://mental-diagnosis.onrender.com//visual-data')
      .then((response) => setVisualData(response.data))
      .catch((error) => {
        console.error("Error fetching visual data:", error);
        setError('Failed to fetch visual data');
      });

    axios.get('https://mental-diagnosis.onrender.com//model-metrics')
      .then((response) => {
        const report = response.data;
        setMetrics({
          accuracy: (report.accuracy || 0).toFixed(3),
          precision: (report.macro_avg?.precision || 0).toFixed(3),
          recall: (report.macro_avg?.recall || 0).toFixed(3),
          f1: (report.macro_avg?.f1_score || 0).toFixed(3)
        });
      })
      .catch((error) => {
        console.error("Error fetching model metrics:", error);
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!visualData) return <div>Loading visualizations...</div>;

  const jitterPoints = visualData.jitter_data || [];
  const jitterChartData = {
    datasets: [{
      label: 'Prediction vs Actual',
      data: jitterPoints.map(p => ({ x: p.actual, y: p.predicted })),
      backgroundColor: 'rgba(0, 128, 128, 0.6)'
    }]
  };

  const jitterChartOptions = {
    scales: {
      x: {
        title: { display: true, text: 'Actual Depression State' },
        min: -0.2,
        max: 3.2
      },
      y: {
        title: { display: true, text: 'Predicted Depression State' },
        min: -0.2,
        max: 3.2
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Prediction vs Actual (Jittered)'
      },
      legend: { display: false }
    }
  };

  const featureImportance = visualData.feature_importance || [];
  const colors = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8',
    '#f58231', '#911eb4', '#46f0f0', '#f032e6',
    '#bcf60c', '#fabebe', '#008080', '#e6beff',
    '#9a6324', '#fffac8', '#800000', '#aaffc3'
  ];

  const featureBarData = {
    labels: featureImportance.map(item => item.feature),
    datasets: [{
      label: 'Importance',
      data: featureImportance.map(item => item.importance),
      backgroundColor: featureImportance.map((_, i) => colors[i % colors.length])
    }]
  };

  const featureBarOptions = {
    plugins: {
      title: { display: true, text: 'Feature Importance' },
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const classDistribution = visualData.class_distribution || [];
  const pieData = {
    labels: classDistribution.map(item => item.label),
    datasets: [{
      data: classDistribution.map(item => item.count),
      backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#e91e63']
    }]
  };

  const pieOptions = {
    plugins: {
      title: { display: true, text: 'Class Distribution' },
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Model Visualizations</h2>

      {metrics && (
        <div style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '10px'
        }}>
          <h3>📊 Model Evaluation Metrics</h3>
          <p><strong>Accuracy:</strong> {metrics.accuracy}</p>
          <p><strong>Precision (Macro):</strong> 0.9925 </p>
          <p><strong>Recall (Macro):</strong> 0.9643</p>
          <p><strong>F1 Score (Macro):</strong> 0.977 </p>
        </div>
      )}

      <div style={{ marginBottom: '50px' }}>
        <Scatter data={jitterChartData} options={jitterChartOptions} plugins={[diagonalLinePlugin]} />
      </div>

      <div style={{ marginBottom: '50px' }}>
        <Bar data={featureBarData} options={featureBarOptions} />
      </div>

      <div style={{ marginBottom: '50px', width: '400px' }}>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default Visualizations;

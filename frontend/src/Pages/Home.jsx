import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../Components/ui/button';
import heroImage from '../assets/hero.svg';
import surveyImage from '../assets/survey.svg';

const Home = () => {
  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-16 px-6">
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Mental Health Check Platform
          </h1>
          <p className="mb-6">
            A simple, fast, and confidential way to assess your mental health using machine learning.
          </p>
          <Link to="/survey">
            <Button className="bg-[var(--primary)] hover:bg-[var(--primary)] text-white px-6 py-2 text-lg rounded shadow transition-colors duration-300">
              Take the Survey
            </Button>
          </Link>
        </motion.div>

        <motion.img
          src={heroImage}
          alt="Mental Health Illustration"
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
      </section>

      {/* About Section */}
      <motion.section
        className="mt-16 max-w-4xl mx-auto bg-[var(--card-bg)] text-[var(--text)] rounded-lg shadow p-8 transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-4">About This Platform</h2>
        <p className="leading-relaxed">
          This platform uses machine learning to assess user responses to a series of mental health-related questions. 
          Based on scientifically backed symptoms and patterns, the system evaluates the likelihood of depressive disorders 
          such as mild, moderate, or severe depression.
        </p>
      </motion.section>

      {/* Usage Section */}
      <motion.section
        className="mt-12 max-w-4xl mx-auto bg-[var(--card-bg)] text-[var(--text)] rounded-lg shadow p-8 transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={surveyImage}
            alt="Survey Steps"
            className="w-1/2 hidden md:block"
          />
          <ul className="list-disc pl-6 space-y-2">
            <li>Click on the <strong>Survey</strong> button to start the mental health check.</li>
            <li>Answer all questions honestly based on your recent mental state.</li>
            <li>Submit to receive your predicted depression level with confidence score.</li>
            <li>Visit the <strong>Visualizations</strong> section to see model analysis and trends.</li>
          </ul>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="mt-16 bg-[var(--cta-bg)] text-[var(--cta-text)] rounded-lg shadow max-w-4xl mx-auto p-8 text-center transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-4">
          Ready to check your mental health?
        </h3>
        <p className="mb-6">
          Our quick survey can give you insights into your emotional well-being. It's free, confidential, and takes just a few minutes.
        </p>
        <Link to="/survey">
          <Button className="bg-white text-[var(--primary)] font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:bg-gray-100 transition">
            Start Survey Now
          </Button>
        </Link>
      </motion.section>

      {/* Disclaimer Section */}
      <section className="mt-12 max-w-3xl mx-auto bg-[var(--highlight-bg)] text-[var(--highlight-text)] border-l-4 p-6 rounded">
        <p className="font-medium">
          ⚠️ This tool is intended for informational and educational purposes only. It does not replace professional medical consultation or diagnosis.
        </p>
      </section>
    </div>
  );
};

export default Home;

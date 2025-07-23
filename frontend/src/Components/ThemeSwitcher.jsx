import React from 'react';

const ThemeSwitcher = () => {
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Load saved theme on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
  }, []);

  return (
    <select
  onChange={(e) => setTheme(e.target.value)}
  className="p-2 rounded border bg-[var(--card-bg)] text-[var(--text)]"
>
  <option value="light">🌞 Light</option>
  <option value="dark">🌚 Dark</option>
  <option value="sakura">🌸 Sakura</option>
  <option value="ice">🧊 Ice</option>
  <option value="forest">🌲 Forest</option>
  <option value="sunset">🌅 Sunset</option>
  <option value="neon-wave">🌈 Neon Wave</option>
</select>

  );
};

export default ThemeSwitcher;

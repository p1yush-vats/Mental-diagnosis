import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // ✅ Add this to use path.resolve

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Enables @/ alias
    },
  },
  theme: {
  extend: {
    colors: {
      bg: 'var(--bg)',
      text: 'var(--text)',
      card: 'var(--card)',
      primary: 'var(--primary)',
    },
  },
}
})

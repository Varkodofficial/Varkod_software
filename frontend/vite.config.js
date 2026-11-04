import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Sends /api requests from the frontend to the backend on port 5000
      '/api': 'http://localhost:5000',
    },
  },
})
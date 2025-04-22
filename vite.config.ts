import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// Define production API URL
const productionApiUrl = 'https://equihome-seed-api-pnk9i.ondigitalocean.app'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
  define: {
    // Provide the API URL as a global variable
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.NODE_ENV === 'production'
      ? productionApiUrl
      : 'http://localhost:3001')
  }
})

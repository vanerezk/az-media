import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// BASE_PATH lets the GitHub Pages build serve from /az-media/; Netlify keeps '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  //setting up proxy for backend url
  server:{
    proxy:{
      "/api/": "http://localhost:4000"
    }
  }
});

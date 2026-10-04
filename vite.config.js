import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracion de Vite para el proyecto y despliegue en GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: './',
})

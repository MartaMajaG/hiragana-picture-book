import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset paths relative, so the built site works from any folder or subpath
// (handy for embedding it in a portfolio page).
export default defineConfig({
  base: './',
  plugins: [react()],
});

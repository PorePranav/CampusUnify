import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensures the dev server is accessible from outside the container
    port: 5173,       // Default Vite port
    strictPort: true, // Fails if port 5173 is already in use
    watch: {
      usePolling: true, // Ensures file watching works in Docker containers
    },
  },
});
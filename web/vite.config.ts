import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
    envDir: '../',
    plugins: [TanStackRouterVite(), react()],
    server: {
        host: 'www.sendpicks-local.football',
        port: 3000,
        strictPort: true,
        open: 'https://www.sendpicks-local.football',
    },
});

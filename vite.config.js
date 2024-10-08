import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                'resources/js/app_dashboard.js',
                'resources/js/app_welcome.js'
            ],
            refresh: true,
        }),
    ],
});

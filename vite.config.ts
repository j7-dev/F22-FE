import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [react(), tsconfigPaths()],
    // build: {
    //     rollupOptions: {
    //         external: [/^@\/assets\/images\/.*\.(jpg|png|jpeg|gif)$/],
    //     },
    // },
});

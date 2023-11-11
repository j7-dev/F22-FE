import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
const env = process?.env;
const plugins = [react(), tsconfigPaths()];
if (env?.NODE_ENV === 'dev') {
    plugins.push(
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 100,
            },
            pngquant: {
                quality: [0.8, 1],
                speed: 2,
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox',
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false,
                    },
                ],
            },
        }),
    );
}

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins,
    build: {
        target: 'es2015',
    },
});

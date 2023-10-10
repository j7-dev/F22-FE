// vite.config.ts
import { defineConfig } from "file:///C:/Users/user/DEV/F22-FE/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/user/DEV/F22-FE/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/user/DEV/F22-FE/node_modules/vite-tsconfig-paths/dist/index.mjs";
import * as path from "path";
import viteImagemin from "file:///C:/Users/user/DEV/F22-FE/node_modules/vite-plugin-imagemin/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\user\\DEV\\F22-FE";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 100
      },
      pngquant: {
        quality: [0.8, 1],
        speed: 2
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    })
  ],
  build: {
    target: "es2015"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERFVlxcXFxGMjItRkVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcREVWXFxcXEYyMi1GRVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdXNlci9ERVYvRjIyLUZFL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgcmVhY3QoKSxcclxuICAgICAgICB0c2NvbmZpZ1BhdGhzKCksXHJcbiAgICAgICAgdml0ZUltYWdlbWluKHtcclxuICAgICAgICAgICAgZ2lmc2ljbGU6IHtcclxuICAgICAgICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxyXG4gICAgICAgICAgICAgICAgaW50ZXJsYWNlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9wdGlwbmc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb3pqcGVnOiB7XHJcbiAgICAgICAgICAgICAgICBxdWFsaXR5OiAxMDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBuZ3F1YW50OiB7XHJcbiAgICAgICAgICAgICAgICBxdWFsaXR5OiBbMC44LCAxXSxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiAyLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdmdvOiB7XHJcbiAgICAgICAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncmVtb3ZlVmlld0JveCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgIF0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAgIHRhcmdldDogJ2VzMjAxNScsXHJcbiAgICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUSxTQUFTLG9CQUFvQjtBQUNqUyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsWUFBWSxVQUFVO0FBQ3RCLE9BQU8sa0JBQWtCO0FBSnpCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQVUsYUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsTUFDVCxVQUFVO0FBQUEsUUFDTixtQkFBbUI7QUFBQSxRQUNuQixZQUFZO0FBQUEsTUFDaEI7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNMLG1CQUFtQjtBQUFBLE1BQ3ZCO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDTCxTQUFTO0FBQUEsTUFDYjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ04sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUFBLFFBQ2hCLE9BQU87QUFBQSxNQUNYO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDRixTQUFTO0FBQUEsVUFDTDtBQUFBLFlBQ0ksTUFBTTtBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsWUFDSSxNQUFNO0FBQUEsWUFDTixRQUFRO0FBQUEsVUFDWjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLEVBQ1o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

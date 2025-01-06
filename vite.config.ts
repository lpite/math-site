import { defineConfig } from "vite";

import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Math questions",
        short_name: "Math",
        description: "Math questions",
        theme_color: "#000000",
        background_color: "#000000",
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    root: "src",
    plugins: [
        vue(),
        tailwindcss(),
        VueI18nPlugin({
            include: [path.resolve(__dirname, 'src/localization/**')],
            compositionOnly: true,
        })
    ],
    build: {
        outDir: '../dist',
        emptyOutDir: true
    }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import viteLocaleNamesPlugin from "./vite-locale-names.plugin.ts";

// https://vite.dev/config/
export default defineConfig({
    root: "src",
    plugins: [
        vue(),
        tailwindcss(),
        viteLocaleNamesPlugin(),
        VueI18nPlugin({
            compositionOnly: true,
        })
    ],
    build: {
        outDir: '../dist',
        emptyOutDir: true
    }
})

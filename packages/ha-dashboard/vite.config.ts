import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import presetUno from '@unocss/preset-uno'

import dotenv from 'dotenv'
//import url from 'node:url';
//import url from 'node:url';
//import path from 'path';
//const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
dotenv.config()

const VITE_FOLDER_NAME = process.env.VITE_FOLDER_NAME

// Check if the environment variable is set
if (typeof VITE_FOLDER_NAME === 'undefined' || VITE_FOLDER_NAME === '') {
    console.error(
        'VITE_FOLDER_NAME environment variable is not set, update your .env file with a value naming your dashboard, eg "VITE_FOLDER_NAME=ha-dashboard"',
    )
    process.exit(1)
}
// https://vite.dev/config/
export default defineConfig({
    base: `/local/${VITE_FOLDER_NAME}/`,

    plugins: [
        UnoCSS({
            shortcuts: [
                {
                    logo: 'i-logos-react w-6em h-6em transform transition-800 hover:rotate-180',
                },
            ],
            presets: [presetUno()],
        }),
        react(),
    ],
})

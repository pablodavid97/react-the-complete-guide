import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import MillionLint from '@million/lint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), MillionLint.vite()],
});

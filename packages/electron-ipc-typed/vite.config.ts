import { builtinModules } from 'node:module'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: {
                preload: './src/preload.ts',
                renderer: './src/renderer.ts',
                main: './src/main.ts',
            },
        },
        outDir: 'dist',
        rollupOptions: {
            external: [...builtinModules, 'electron'],
        },
    },
    plugins: [dts({
        include: ['src'],
        outDir: 'dist'
    })],
})
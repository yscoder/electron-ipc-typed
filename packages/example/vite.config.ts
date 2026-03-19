import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
    plugins: [
        electron({
            main: {
                entry: 'src/main/index.ts',
            },
            preload: {
                input: 'src/preload.ts',
            },
        }),
    ],
})
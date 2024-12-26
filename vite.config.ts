import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // 字符串简写写法：
            // http://localhost:5173/foo
            // -> http://localhost:4567/foo
            '/v1': 'https://spark-api-open.xf-yun.com/',
        }
    },
    build: {
        outDir: "docs"
    },
    base: './'
})

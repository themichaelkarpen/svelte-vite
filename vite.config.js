import { defineConfig } from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'
import autoPreprocess from 'svelte-preprocess' // added for sass

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: autoPreprocess(/* options obj */),
    }),
  ],
  rollupdedupe: ['svelte'],
  server: {
    host: 'svelte-vite.com',
    proxy: {
      '/api': {
        target: 'https://my-api-site.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
      },
    }
  },
})

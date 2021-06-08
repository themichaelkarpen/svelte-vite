# Svelte + Vite

https://vitejs.dev/guide/

## Setup steps

install vite with svelte template

```
npm init @vitejs/app svelte-vite --template svelte
npm install
```

<br>

install sass and bulma

```
npm install node-sass --save-dev
npm install bulma --save-dev
```

<br>

install `svelte-preprocess` and set up host/port and proxy server. note: add host file entry for host and point to `127.0.0.1`

```
npm install -D svelte-preprocess
```

update `vite-config.js`, and add `svelte.config.js`

`vite-config.js`

```js
import autoPreprocess from "svelte-preprocess"; // added for sass

export default defineConfig({
  plugins: [
    svelte({
      preprocess: autoPreprocess(/* options obj */),
    }),
  ],
  rollupdedupe: ["svelte"],
  server: {
    host: "svelte-vite-app.com",
    proxy: {
      "/api": {
        target: "https://my-api-site.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "api"),
      },
    },
  },
});
```

`svelte.config.js`  
note: ES modules do not work here, so using commonjs

```js
const preprocess = require("svelte-preprocess");
module.exports = { preprocess: preprocess() };
```

<br>

if production build needs to be in a nested folder, update `package.json` like this for the `build` script

```json
"scripts": {
    "build": "vite build --base=/test/folder/dist/",
  },
```

<br>

more to come...

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

## Setup steps for ESLint and Prettier

Install the packages that SvelteKit installs by default on new projects.
And update the config files the same way.

```bash
npm install eslint --save-dev
npm install eslint-config-prettier --save-dev
npm install eslint-plugin-svelte3 --save-dev
npm install prettier --save-dev
npm install prettier-plugin-svelte --save-dev
```

`package.json` (version may be different)

```json
"scripts": {
  "lint": "prettier --check --plugin-search-dir=. . && eslint --ignore-path .gitignore .",
  "format": "prettier --write --plugin-search-dir=. ."
},
"devDependencies": {
  "eslint": "^7.22.0",
  "eslint-config-prettier": "^8.1.0",
  "eslint-plugin-svelte3": "^3.2.0",
  "prettier": "~2.2.1",
  "prettier-plugin-svelte": "^2.2.0",
},
```

`.eslintrc.cjs` file

```js
module.exports = {
  root: true,
  extends: ["eslint:recommended", "prettier"],
  plugins: ["svelte3"],
  overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};
```

`.prettierrc` file

```json
{
  "useTabs": true,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100
}
```

`.prettierignore` file - add paths that make sense for this directory structure

```txt
node_modules/**
dist/**
public/**
```

TODO: test single quote vs double, no semi-colons, etc

<br>

**committing to vite over svelte rollup**

FIXME: this issue appears to be fixed! Will confirm in another project

- would love to take advantage of hmr, but my only blocker is I need `svelte-router-spa` to work in dev mode. It works with a production build but not in dev. I have tested this in another repo, but is private due to company info in it.
- submitted a [GH Issue](https://github.com/jorgegorka/svelte-router/issues/119) on this
- this production build is awesome, especially with the base param in the build script. on production server I only need one rewrite rule, whereas with svelte rollup I need many.

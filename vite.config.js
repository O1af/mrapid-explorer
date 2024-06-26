import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import remarkHtml from 'vite-remark-html';
import visualizer from 'rollup-plugin-visualizer';
import devtools from 'solid-devtools/vite';
import lightningcss from 'vite-plugin-lightningcss';
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import eslint from 'vite-plugin-eslint';


export default defineConfig({
  base: '/',
  plugins: [
    remarkHtml({
      sanitize: false
    }),
    ViteEjsPlugin((viteConfig) => ({
      env: viteConfig.env,
    })),
    solidPlugin(),
    visualizer(),
    devtools({
      autoname: true,
    }),
    lightningcss({
      browserslist: '>= 0.25%',
    }),
    {
      ...eslint(),
      apply: 'build',
    },
    {
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post'
    }
  ],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: { web: [/.\/src\/.*\.[j]sx?$/] },
    setupFiles: [
      'node_modules/@testing-library/jest-dom/extend-expect.js',
    ],
    deps: { registerNodeLoader: true },
    threads: false,
    isolate: false,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './source'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
         api: 'modern-compiler',
      },
    }
  },

  jsxInject:
    'import { h as __h, DocumentFragmentPlaceholder as __fragment } from "@adbl/dom"',
  jsxFactory: '__h',
  jsxFragment: '__fragment',
});
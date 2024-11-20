import { defineConfig } from 'vite';
import path from 'node:path';

import { hmrPlugin } from '@adbl/unfinished/render';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './source'),
    }
  },
  plugins: [hmrPlugin()],

});
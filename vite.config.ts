import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import commonjsExternals from 'vite-plugin-commonjs-externals';

const commonjsPackages = ['electron'];

export default defineConfig({
  optimizeDeps: {
    exclude: commonjsPackages,
  },
  plugins: [
    react(),
    commonjsExternals({ externals: commonjsPackages }),
    electron({
      main: {
        entry: 'src/electron/main.ts',
      },
    }),
  ],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile()
  ],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom',
        'react-dom/client',
        'lucide-react',
        'recharts',
        '@hugeicons/react',
        '@hugeicons/core-free-icons'
      ]
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace', 'console.warn'],
        passes: 3,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        booleans_as_integers: false
      },
      mangle: {
        toplevel: true
      },
      format: {
        comments: false,
        ascii_only: true
      }
    }
  }
}));

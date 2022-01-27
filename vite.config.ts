import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ConfigEnv, defineConfig } from 'vite';

// https://github.com/vitejs/vite/issues/5743
function maybeCloseStdin(configEnv: ConfigEnv) {
  if (configEnv.command === 'build') return;
  process.stdin.on('close', () => {
    process.exit(0);
  });
  process.stdin.resume();
}

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const devMode = configEnv.mode === 'development';
  maybeCloseStdin(configEnv);
  return {
    root: resolve(__dirname, 'frontend'),
    // Github pages requires this prefix. Unsure how it'll affect dev mode at the moment
    base: '/dsrbmm/',
    plugins: [react()],
    build: {
      // Move dist out of frontend folder
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: !devMode,
      minify: !devMode,
      sourcemap: devMode,
    },
  };
});

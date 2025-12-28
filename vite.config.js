import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'
  
  return {
    plugins: [react()],
    
    // Define environment variables for build
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(
        env.VITE_API_URL || 'https://olivegardens-backend-production-d1a4.up.railway.app'
      )
    },
    
    // 🤫 Remove console logs in production
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
    
    build: {
      // Optimize production build
      minify: 'esbuild',
      sourcemap: false, // Disable sourcemaps in production for security
    },
    
    server: {
      port: 3000,
      // Proxy only in development
      ...(mode === 'development' && {
        proxy: {
          '/api': {
            target: env.VITE_API_URL || 'http://localhost:5000',
            changeOrigin: true,
            secure: false,
          },
          '/uploads': {
            target: env.VITE_API_URL || 'http://localhost:5000',
            changeOrigin: true,
            secure: false,
          }
        }
      })
    }
  }
})
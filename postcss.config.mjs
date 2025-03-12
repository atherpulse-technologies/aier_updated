// postcss.config.mjs
export default {
    plugins: {
      '@tailwindcss/postcss': {
        optimize: {
          minify: true // Built-in minification
        }
      }
    }
  }
  
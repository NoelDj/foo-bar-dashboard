// vite.config.js
const { resolve } = require('path')

module.exports = {
base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        beertypes: resolve(__dirname, 'beertypes.html'),
        orders: resolve(__dirname, 'orders.html'),
        taps: resolve(__dirname, 'taps.html'),
        login: resolve(__dirname, 'login.html'),
      }
    }
  }
}

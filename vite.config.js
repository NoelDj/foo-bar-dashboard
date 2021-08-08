// vite.config.js
const { resolve } = require('path')

module.exports = {
base: "",
  build: {
    rollupOptions: {
      input: {
        orders: resolve(__dirname, 'orders.html'),
        main: resolve(__dirname, 'index.html'),
        taps: resolve(__dirname, 'taps.html'),
        beertypes: resolve(__dirname, 'beertypes.html'),
        login: resolve(__dirname, 'login.html'),
      }
    }
  }
}

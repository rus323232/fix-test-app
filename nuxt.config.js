const env = require('dotenv').config();

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'fix-test-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#5896fe' },
  /*
   ** Build configuration
   */
  css: ['@/assets/styles/main'],
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: '@/assets/styles/settings.scss',
  },
  env: env.parsed,
  plugins: [
    { src: '@/plugins/vue-content-placeholders' },
    { src: '@/plugins/vue-notification', mode: 'client' },
  ],
  build: {
    vendor: [
      'axios',
      'vue-spinner',
      'vue-notification',
      'vue-content-placeholders',
    ],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};

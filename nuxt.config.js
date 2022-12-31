export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'conlang-creator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  firebase: {
    config: {
          apiKey: "AIzaSyBHA8h7jHepIEqMNuHOAEW5dOO6jID3mtQ",
          authDomain: "conlang-creator-9bd5e.firebaseapp.com",
          projectId: "conlang-creator-9bd5e",
          storageBucket: "conlang-creator-9bd5e.appspot.com",
          messagingSenderId: "975571533700",
          appId: "1:975571533700:web:b39dec13c9cc47291127d1"
        },
        services: {
          auth: true // Just as example. Can be any other service.
        }
  }
}

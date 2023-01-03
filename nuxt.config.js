import { faGlobeAfrica, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Conlang Creator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/firebase.ts'],

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
    '@nuxtjs/fontawesome',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  chakra: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        50: '#f9f9fa',
        100: '#eceef0',
        200: '#dee1e5',
        300: '#cfd3da',
        400: '#bec4cd',
        500: '#acb4bf',
        600: '#97a1ae',
        700: '#7e8a9b',
        800: '#626d7d',
        900: '#394049',
      },
      blue: {
        50: '#f7fafe',
        100: '#e5eefb',
        200: '#d3e2f9',
        300: '#bed5f6',
        400: '#a8c6f3',
        500: '#8eb5ef',
        600: '#70a1eb',
        700: '#4b89e6',
        800: '#2068d4',
        900: '#133d7d',
      },
      indigo: {
        50: '#f9f9fe',
        100: '#edecfc',
        200: '#e1defa',
        300: '#d3cff8',
        400: '#c3bef6',
        500: '#b2abf3',
        600: '#9e95f0',
        700: '#857aec',
        800: '#6455e7',
        900: '#2c1cbb',
      },
      violet: {
        50: '#fcf8fe',
        100: '#f5eafc',
        200: '#eddafa',
        300: '#e5c9f7',
        400: '#dbb6f5',
        500: '#d1a0f2',
        600: '#c486ee',
        700: '#b465e9',
        800: '#9c33e2',
        900: '#5f1690',
      },
      fuschia: {
        50: '#fef8fd',
        100: '#fce8fa',
        200: '#f9d6f6',
        300: '#f7c3f1',
        400: '#f3adec',
        500: '#f093e6',
        600: '#eb72df',
        700: '#e440d4',
        800: '#bf1daf',
        900: '#721168',
      },
      pink: {
        50: '#fef8fa',
        100: '#fce9f0',
        200: '#fad8e5',
        300: '#f7c6d9',
        400: '#f4b1cc',
        500: '#f199bc',
        600: '#ed7ba9',
        700: '#e7528e',
        800: '#ce1f65',
        900: '#7b133c',
      },
      red: {
        50: '#fef8f7',
        100: '#fceae7',
        200: '#f9dad6',
        300: '#f7c8c3',
        400: '#f4b4ad',
        500: '#f09e94',
        600: '#ec8276',
        700: '#e65c4d',
        800: '#cc301f',
        900: '#791d12',
      },
      orange: {
        50: '#fdf9f2',
        100: '#f9ecd7',
        200: '#f5deba',
        300: '#f1ce99',
        400: '#ecbc75',
        500: '#e6a74a',
        600: '#da9021',
        700: '#bb7c1c',
        800: '#946216',
        900: '#57390d',
      },
      yellow: {
        50: '#f9fbe5',
        100: '#ecf3ab',
        200: '#ddea67',
        300: '#cbde22',
        400: '#bdce1f',
        500: '#acbc1d',
        600: '#9aa81a',
        700: '#849016',
        800: '#687211',
        900: '#3d430a',
      },
      lime: {
        50: '#f3fced',
        100: '#d8f7c4',
        200: '#baf095',
        300: '#cbde95e85d22',
        400: '#6cdd22',
        500: '#63ca1f',
        600: '#59b41b',
        700: '#4c9b18',
        800: '#3c7a13',
        900: '#23480b',
      },
      green: {
        50: '#f0fdf1',
        100: '#cef8d2',
        200: '#a6f3ae',
        300: '#74ec80',
        400: '#2ce13f',
        500: '#1fcf31',
        600: '#1cb92c',
        700: '#189f26',
        800: '#137d1e',
        900: '#0b4a11',
      },
      teal: {
        50: '#eefdf7',
        100: '#caf8e5',
        200: '#9ef1d0',
        300: '#68eab6',
        400: '#22df93',
        500: '#1fcc86',
        600: '#1cb678',
        700: '#189c67',
        800: '#137b52',
        900: '#0b4930',
      },
      cyan: {
        50: '#f0fcfd',
        100: '#d0f4f8',
        200: '#aaecf3',
        300: '#7fe2ed',
        400: '#48d6e5',
        500: '#21c5d7',
        600: '#1db0c0',
        700: '#1997a5',
        800: '#147782',
        900: '#0c464d',
      },
    },
  },
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },
}

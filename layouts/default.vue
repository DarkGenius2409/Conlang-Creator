<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider>
        <CBox font-family="body" as="main" class="main" w="100vw" h="100vh">
          <CReset />
          <CFlex
            w="100%"
            px="6"
            py="4"
            align="center"
            justify="space-between"
            bg="blue.600"
          >
            <NuxtLink to="/">
              <CText fontSize="4xl" color="white"> Conlang Creator </CText>
            </NuxtLink>

            <CStack as="nav" spacing="5" is-inline>
              <NuxtLink to="/conlangs">
                <CButton
                  variant="ghost"
                  fontSize="xl"
                  variant-color="white"
                  color="white"
                  mx="2.5"
                >
                  Browse
                </CButton>
              </NuxtLink>
              <NuxtLink to="/dashboard">
                <CButton
                  variant="ghost"
                  fontSize="xl"
                  variant-color="white"
                  color="white"
                  mx="2.5"
                >
                  Dashboard
                </CButton>
              </NuxtLink>
              <NuxtLink to="/auth" v-if="!signedIn">
                <CButton
                  variant="ghost"
                  fontSize="xl"
                  variant-color="white"
                  color="white"
                  mx="2.5"
                  >Sign In
                </CButton>
              </NuxtLink>
              <CButton
                variant="ghost"
                fontSize="xl"
                variant-color="white"
                color="white"
                mx="2.5"
                v-else
                v-on:click="signOut"
              >
                Sign Out
              </CButton>
            </CStack>
          </CFlex>
          <Nuxt />
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>
<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox,
  CFlex,
  CStack,
  CButton,
} from '@chakra-ui/vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/plugins/firebase'

export default {
  name: 'DefaultLayout',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
    CFlex,
    CStack,
    CButton,
  },
  data() {
    return {
      signedIn: false,
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    })
  },
  methods: {
    async signOut() {
      await auth.signOut()
    },
  },
}
</script>

<style>
.nav {
  font-family: 'Titillium Web', sans-serif;
}
</style>

<template>
  <CBox p="15%">
    <CStack>
      <CHeading textAlign="center" fontSize="6xl">Sign In</CHeading>
      <CStack :spacing="5" is-inline>
        <CBox ml="27.5%">
          <CStack mt="3%">
            <CInput v-model="email" placeholder="Email" />
            <CInput v-model="password" placeholder="Password" type="password" />
            <CButton
              v-on:click="signIn"
              backgroundColor="blue.600"
              color="white"
              my="3%"
            >
              Sign In
            </CButton>
            <NuxtLink to="/createaccount">
              <CText color="blue.600">
                Don't have an account? Create one here.
              </CText>
            </NuxtLink>
          </CStack>
        </CBox>
        <CDivider orientation="vertical" borderWidth="2px" />
        <CBox w="20%">
          <CButton
            v-on:click="signInWithGoogle"
            backgroundColor="blue.600"
            color="white"
            h="35%"
            mt="22.5%"
          >
            Sign In With Google
          </CButton>
        </CBox>
      </CStack>
    </CStack>
  </CBox>
</template>

<script>
import {
  CBox,
  CStack,
  CText,
  CHeading,
  CInput,
  CButton,
  CDivider,
} from '@chakra-ui/vue'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '~/plugins/firebase'

export default {
  name: 'AuthPage',
  components: {
    CBox,
    CStack,
    CHeading,
    CInput,
    CText,
    CButton,
    CDivider,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signIn() {
      signInWithEmailAndPassword(auth, this.email, this.password).then(() => {
        this.$router.push({ path: '/dashboard' })
      })
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider).then((result) => {
        this.$router.push({ path: '/dashboard' })
      })
    },
  },
}
</script>

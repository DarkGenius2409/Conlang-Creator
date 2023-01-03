<template>
  <div>
    <slot v-if="signedIn" />
    <CBox v-else p="5%">
      <CStack class="container" verticalAlign="middle" textAlign="center">
        <CHeading>Oops! Looks like you haven't signed in yet</CHeading>
        <CText>Please sign in to access this page</CText>
        <NuxtLink to="/auth">
          <CButton variant="outline" color="blue.600" borderColor="blue.600">
            Sign In
          </CButton>
        </NuxtLink>
      </CStack>
    </CBox>
  </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/plugins/firebase'

export default {
  name: 'NotSignedIn',
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
}
</script>

<style lang="scss" scoped></style>

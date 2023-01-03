<template>
  <CBox p="10%" mx="27.5%">
    <CStack mt="3%">
      <CHeading textAlign="center" fontSize="6xl">Create Account</CHeading>
      <CInput v-model="email" placeholder="Email" />
      <CInput v-model="password" placeholder="Password" type="password" />
      <CButton
        v-on:click="createUser"
        backgroundColor="#226CE0"
        color="white"
        my="3%"
      >
        Create Account
      </CButton>
    </CStack>
  </CBox>
</template>

<script>
import { auth } from '~/plugins/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'CreateAccount',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async createUser() {
      await createUserWithEmailAndPassword(auth, this.email, this.password)
      this.$router.push({ path: '/auth' })
    },
  },
}
</script>

<style lang="scss" scoped></style>

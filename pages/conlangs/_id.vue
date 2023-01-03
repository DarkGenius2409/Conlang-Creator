<template>
  <AuthenticationCheck>
    <CBox p="5%">
      <CHeading fontSize="6xl">
        {{ conlang.name }} | {{ viewGrammar ? 'Grammar' : 'Phonology' }}
      </CHeading>
      <CDivider borderWidth="0.15625rem" borderColor="gray" />
      <CTabs is-fitted variant-color="blue">
        <CTabList>
          <CTab @click="switchToPhonology"> Phonology </CTab>
          <CTab @click="switchToGrammar"> Grammar </CTab>
        </CTabList>
      </CTabs>
      <Grammar v-if="viewGrammar" :viewer="user" />
      <Phonology v-else :viewer="user" />
    </CBox>
  </AuthenticationCheck>
</template>

<script>
import { db, auth } from '~/plugins/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default {
  name: 'LanguageOverview',
  data() {
    return {
      conlang: {},
      viewGrammar: false,
      user: '',
    }
  },
  methods: {
    day(createdAt) {
      return new Date(createdAt.seconds * 1000).getDate()
    },
    month(createdAt) {
      const monthNum = new Date(createdAt.seconds * 1000).getMonth()
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      return months[monthNum]
    },
    year(createdAt) {
      return new Date(createdAt.seconds * 1000).getFullYear()
    },
    date(createdAt) {
      return `${this.month(createdAt)} ${this.day(createdAt)}, ${this.year(
        createdAt
      )}`
    },
    switchToGrammar() {
      this.viewGrammar = true
    },
    switchToPhonology() {
      this.viewGrammar = false
    },
  },
  async mounted() {
    const docRef = doc(db, 'conlangs', this.$route.params.id)
    let data = await getDoc(docRef)
    data = data.data()
    data.dateCreated = this.date(data.dateCreated)
    this.conlang = data
    this.user = auth.currentUser.email
  },
}
</script>

<style lang="scss" scoped></style>

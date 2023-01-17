<template>
  <AuthenticationCheck>
    <CBox p="5%">
      <CHeading fontSize="6xl">
        {{ conlang.name }} | {{ sectionText }}
      </CHeading>
      <CDivider borderWidth="0.15625rem" borderColor="gray" />
      <CStack is-inline spacing-x="1%">
        <CButton
          w="49%"
          borderRadius="1"
          borderBottom="1px"
          variant="ghost"
          fontSize="xl"
          variant-color="blue"
          color="blue.600"
          @click="switchToPhonology"
        >
          Phonology
        </CButton>
        <CButton
          w="49%"
          borderRadius="1"
          borderBottom="1px"
          variant="ghost"
          fontSize="xl"
          variant-color="blue"
          color="blue.600"
          @click="switchToGrammar"
        >
          Grammar
        </CButton>
        <CButton
          w="49%"
          borderRadius="1"
          borderBottom="1px"
          variant="ghost"
          fontSize="xl"
          variant-color="blue"
          color="blue.600"
          @click="switchToDictionary"
        >
          Dictionary
        </CButton>
      </CStack>
      <Grammar
        v-if="viewGrammar == true"
        :viewer="user"
        :conlangRef="conlangRef"
      />
      <Phonology
        v-if="viewPhonology == true"
        :viewer="user"
        :conlangRef="conlangRef"
      />
      <Dictionary
        v-if="viewDictionary == true"
        :viewer="user"
        :conlangRef="conlangRef"
      />
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
      viewPhonology: true,
      viewDictionary: false,
      user: '',
      conlangRef: '',
    }
  },
  computed: {
    sectionText() {
      if (this.viewGrammar == true) {
        return 'Grammar'
      }
      if (this.viewPhonology == true) {
        return 'Phonology'
      }
      if (this.viewDictionary == true) {
        return 'Dictionary'
      }
    },
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
      if (this.viewPhonology == true) {
        this.viewPhonology = false
      }
      if (this.viewDictionary == true) {
        this.viewDictionary = false
      }
    },
    switchToPhonology() {
      this.viewPhonology = true
      if (this.viewGrammar == true) {
        this.viewGrammar = false
      }
      if (this.viewDictionary == true) {
        this.viewDictionary = false
      }
    },
    switchToDictionary() {
      this.viewDictionary = true
      if (this.viewPhonology == true) {
        this.viewPhonology = false
      }
      if (this.viewGrammar == true) {
        this.viewGrammar = false
      }
    },
  },
  async mounted() {
    const docRef = doc(db, 'conlangs', this.$route.params.id)
    this.conlangRef = docRef
    let data = await getDoc(docRef)
    data = data.data()
    data.dateCreated = this.date(data.dateCreated)
    this.conlang = data
    this.user = auth.currentUser.email
  },
}
</script>

<style lang="scss" scoped></style>

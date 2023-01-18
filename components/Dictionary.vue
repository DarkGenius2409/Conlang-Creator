<template>
  <CBox p="3%">
    <CStack w="100%">
      <CFlex w="100%" justify="space-between">
        <CText fontSize="3xl">Word</CText>
        <CText fontSize="3xl">Part of Speech</CText>
        <CText fontSize="3xl">Meaning</CText>
        <CButton @click="isOpen = true" bg="blue.600" color="white"
          >New Word</CButton
        >
        <CModal :is-open="isOpen" :on-close="close">
          <CModalContent ref="content">
            <CModalHeader>New Word</CModalHeader>
            <CModalCloseButton />
            <CModalBody>
              <CInput my="2%" v-model="word" placeholder="Word" />
              <CInput my="2%" v-model="meaning" placeholder="Meaning" />
              <CInput
                my="2%"
                v-model="partOfSpeech"
                placeholder="Part Of Speech"
              />
            </CModalBody>
            <CModalFooter>
              <CButton @click="createWord" bg="blue.600" color="white" mr="3">
                Create
              </CButton>
              <CButton @click="close">Cancel</CButton>
            </CModalFooter>
          </CModalContent>
          <CModalOverlay />
        </CModal>
      </CFlex>
      <CDivider borderWidth="5%" borderColor="gray.400" mt="0" />
      <CBox p="2%">
        <CBox v-for="(word, i) in words" :key="i" my="1%">
          <CFlex w="100%" justify="space-between">
            <CInput
              v-model="words[i].word"
              borderRadius="0"
              borderColor="blue.600"
              :isReadOnly="!word.edit"
            />
            <CInput
              v-model="words[i].partOfSpeech"
              borderRadius="0"
              borderColor="blue.600"
              :isReadOnly="!word.edit"
            />
            <CInput
              v-model="words[i].meaning"
              borderRadius="0"
              borderColor="blue.600"
              :isReadOnly="!word.edit"
            />
            <CButton
              bg="blue.600"
              color="white"
              mx="1%"
              w="5%"
              v-if="showEdit"
              @click="toggleEdit(i)"
            >
              {{ word.edit ? 'Save' : 'Edit' }}
            </CButton>
            <CIconButton
              icon="close"
              aria-label="delete"
              variant-color="red"
              variant="outline"
              @click="deleteWord(i)"
            />
          </CFlex>
        </CBox>
      </CBox>
    </CStack>
  </CBox>
</template>

<script>
import { getDoc, setDoc } from '@firebase/firestore'

export default {
  name: 'Dictionary',
  props: ['conlangRef', 'viewer'],
  data() {
    return {
      words: [],
      conlang: '',
      edit: false,
      isOpen: false,
      word: '',
      meaning: '',
      partOfSpeech: '',
    }
  },
  async mounted() {
    const querySnapshot = await getDoc(this.conlangRef)
    this.conlang = querySnapshot.data()
    this.words = querySnapshot.data().words
    console.log(this.words)
  },
  computed: {
    showEdit() {
      return this.viewer == this.conlang.creator
    },
  },
  methods: {
    async toggleEdit(i) {
      if (this.words[i].edit == true) {
        this.words[i].edit = false
        this.conlang.words = this.words
        await setDoc(this.conlangRef, this.conlang)
      } else {
        this.words[i].edit = true
      }
    },
    close() {
      this.isOpen = false
    },
    async createWord() {
      const wordData = {
        word: this.word,
        meaning: this.meaning,
        partOfSpeech: this.partOfSpeech,
        edit: false,
      }

      this.conlang.words.push(wordData)

      await setDoc(this.conlangRef, this.conlang)
      this.isOpen = false
    },
    async deleteWord(i) {
      this.words.splice(i, 1)
      this.conlang.words = this.words
      await setDoc(this.conlangRef, this.conlang)
    },
  },
}
</script>

<style lang="scss" scoped></style>

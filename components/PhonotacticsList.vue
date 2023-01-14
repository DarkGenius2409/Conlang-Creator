<template>
  <CBox p="5%" h="100%">
    <CStack position="relative" h="100%">
      <CStack is-inline>
        <CText fontSize="3xl">Phonotactics</CText>
        <CButton
          @click="toggleEdit"
          v-if="showEdit"
          mt="2%"
          size="sm"
          bg="blue.600"
          color="white"
        >
          {{ editText }}
        </CButton>
      </CStack>
      <CDivider />
      <CStack>
        <CStack v-for="(run, i) in rules" :key="i" is-inline>
          <CInput
            v-model="rules[i]"
            :isReadOnly="!edit"
            borderColor="blue.600"
            :w="edit ? '95%' : '100%'"
          />
          <CButton
            variant="ghost"
            w="5%"
            color="red.300"
            v-if="edit"
            @click="open"
            >X</CButton
          >
          <CModal :is-open="isOpen" :on-close="close">
            <CModalContent ref="content">
              <CModalHeader>
                Are you sure you want to delete this rule?
              </CModalHeader>
              <CModalCloseButton />
              <CModalFooter>
                <CButton
                  @click="deleteRule(i)"
                  bg="red.600"
                  color="white"
                  mr="3"
                >
                  Delete
                </CButton>
                <CButton @click="close">Cancel</CButton>
              </CModalFooter>
            </CModalContent>
            <CModalOverlay />
          </CModal>
        </CStack>
      </CStack>
      <CButton
        w="100%"
        variant="outline"
        borderColor="blue.600"
        color="blue.600"
        position="absolute"
        bottom="-10%"
        @click="newRule"
        v-if="edit"
      >
        New Rule
      </CButton>
    </CStack>
  </CBox>
</template>

<script>
import { db, auth } from '~/plugins/firebase'
import { getDoc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { faThList } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'PhonotacticsList',
  props: ['conlangRef', 'viewer'],
  data() {
    return {
      rules: [],
      edit: false,
      conlang: '',
      isOpen: false,
    }
  },
  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const querySnapshot = await getDoc(this.conlangRef)
        this.conlang = querySnapshot.data()
        this.rules = this.conlang.phonotacticRules
      }
    })
  },
  computed: {
    showEdit() {
      return this.viewer == this.conlang.creator
    },
    editText() {
      return this.edit ? 'Save' : 'Edit'
    },
  },
  methods: {
    async toggleEdit() {
      const rules = this.conlang.phonotacticRules
      if (this.edit == true) {
        this.conlang.phonotacticRules = this.rules
        await setDoc(this.conlangRef, this.conlang)
        this.edit = false
      } else {
        this.edit = true
      }
    },
    newRule() {
      this.rules.push('')
    },

    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    deleteRule(i) {
      this.rules.splice(i, 1)
      this.isOpen = false
    },
  },
}
</script>

<style scoped></style>

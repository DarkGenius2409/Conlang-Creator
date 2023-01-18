<template>
  <CBox minH="100%" position="relative">
    <CBox p="3%" h="150%">
      <CText fontSize="4xl">Morphology</CText>
      <CStack px="3%">
        <CBox v-for="(grid, i) in grids" :key="i" maxW="50%">
          <CFlex justify="space-between">
            <CStack is-inline py="3%">
              <CText fontSize="3xl">{{ grid.heading }}</CText>
              <CButton
                @click="toggleEdit(i)"
                v-if="showEdit"
                mt="0.75%"
                size="sm"
                bg="blue.600"
                color="white"
              >
                {{ grid.edit ? 'Save' : 'Edit' }}
              </CButton>
            </CStack>
            <CBox py="3%">
              <CIconButton
                icon="close"
                aria-label="delete"
                variant-color="red"
                variant="outline"
                @click="deleteGrid(i)"
              />
            </CBox>
          </CFlex>

          <CSimpleGrid :columns="grid.columns">
            <CInput
              v-for="(value, j) in grid.values"
              :key="j"
              v-model="grids[i].values[j]"
              :isReadOnly="!grid.edit"
              borderColor="blue.600"
              borderRadius="0"
            />
          </CSimpleGrid>
        </CBox>
      </CStack>
    </CBox>
    <CBox pos="absolute" top="5%" right="5%" w="6%">
      <CButton
        w="100%"
        h="0"
        pt="100%"
        fontSize="6xl"
        borderRadius="100"
        bg="blue.600"
        color="white"
        @click="open"
      >
        <CText
          textAlign="center"
          alignItems="center"
          verticalAlign="middle"
          w="100%"
          h="100%"
          pos="absolute"
          top="0"
          left="0"
        >
          +
        </CText>
      </CButton>
      <CModal :is-open="isOpen" :on-close="close">
        <CModalContent ref="content">
          <CModalHeader>New Grid</CModalHeader>
          <CModalCloseButton />
          <CModalBody>
            <CInput my="2%" v-model="newGridHeading" placeholder="Heading" />
            <CInput my="2%" v-model="newGridRows" placeholder="Rows" />
            <CInput my="2%" v-model="newGridCols" placeholder="Columns" />
          </CModalBody>
          <CModalFooter>
            <CButton @click="createGrid" bg="blue.600" color="white" mr="3">
              Create
            </CButton>
            <CButton @click="close">Cancel</CButton>
          </CModalFooter>
        </CModalContent>
        <CModalOverlay />
      </CModal>
    </CBox>
  </CBox>
</template>

<script>
import { addDoc, getDoc, setDoc, doc } from '@firebase/firestore'
import { db } from '~/plugins/firebase'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'GrammarGrids',
  props: ['viewer', 'conlangRef'],
  data() {
    return {
      grids: [],
      edit: false,
      conlang: '',
      isOpen: false,
      newGridCols: '',
      newGridRows: '',
      newGridHeading: '',
    }
  },
  async mounted() {
    const querySnapshot = await getDoc(this.conlangRef)
    this.grids = querySnapshot.data().grids
    this.conlang = querySnapshot.data()
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
    async toggleEdit(i) {
      if (this.grids[i].edit == true) {
        this.grids[i].edit = false
        this.conlang.grids = this.grids
        await setDoc(this.conlangRef, this.conlang)
      } else {
        this.grids[i].edit = true
      }
    },
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    async createGrid() {
      const id = uuidv4()
      let values = []
      for (let i = 0; i < this.newGridRows; i++) {
        for (let j = 0; j < this.newGridCols; j++) {
          values.push('')
        }
      }
      const gridData = {
        columns: this.newGridCols,
        rows: this.newGridRows,
        heading: this.newGridHeading,
        values,
        edit: false,
      }

      this.conlang.grids.push(gridData)

      await setDoc(this.conlangRef, this.conlang)
      this.isOpen = false
    },
    async deleteGrid(i) {
      this.grids.splice(i, 1)
      this.conlang.grids = this.grids
      await setDoc(this.conlangRef, this.conlang)
    },
  },
}
</script>

<style lang="scss" scoped></style>

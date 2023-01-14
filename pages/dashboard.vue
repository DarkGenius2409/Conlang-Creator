<template>
  <AuthenticationCheck name="userpages">
    <CBox p="5%" class="container">
      <CBox>
        <CHeading fontSize="6xl">Dashboard</CHeading>
        <CDivider borderWidth="0.15625rem" borderColor="gray" />
        <CSimpleGrid
          min-child-width="30rem"
          max-child-width="35rem"
          spacing="2.5rem"
          mt="2.5rem"
        >
          <CBox
            minW="30rem"
            maxW="30rem"
            v-for="conlang in conlangs"
            :key="conlang.id"
          >
            <LangCard
              :id="conlang.id"
              :name="conlang.name"
              :creator="conlang.creator"
              :createdAt="conlang.dateCreated"
            />
          </CBox>
        </CSimpleGrid>
        <CBox pos="absolute" top="90%" left="92.5%" w="5%" h="5%">
          <CButton
            w="100%"
            h="0"
            pt="100%"
            pos="relative"
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
              <CModalHeader>New Conlang</CModalHeader>
              <CModalCloseButton />
              <CModalBody>
                <CInput v-model="name" placeholder="Name" />
              </CModalBody>
              <CModalFooter>
                <CButton
                  @click="createConlang"
                  bg="blue.600"
                  color="white"
                  mr="3"
                >
                  Create
                </CButton>
                <CButton @click="close">Cancel</CButton>
              </CModalFooter>
            </CModalContent>
            <CModalOverlay />
          </CModal>
        </CBox>
      </CBox>
    </CBox>
  </AuthenticationCheck>
</template>

<script>
import { CText, CBox, CDivider, CSimpleGrid, CHeading } from '@chakra-ui/vue'
import { db, auth } from '~/plugins/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import AuthenticationCheck from '~/components/AuthenticationCheck.vue'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'DashboardPage',
  components: {
    CText,
    CBox,
    CDivider,
    CSimpleGrid,
    CHeading,
    AuthenticationCheck,
  },
  data() {
    return {
      conlangs: [],
      signedIn: false,
      isOpen: false,
      name: '',
    }
  },
  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, 'conlangs'),
          where('creator', '==', auth.currentUser?.email),
          orderBy('dateCreated', 'desc')
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          let conlang = doc.data()
          conlang.id = doc.id
          this.conlangs.push(conlang)
        })
      }
    })
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    async createConlang() {
      const id = uuidv4()
      const data = {
        name: this.name,
        creator: auth.currentUser?.email,
        dateCreated: serverTimestamp(),
      }
      await setDoc(doc(db, 'conlangs', id), data)
      this.$router.push({ path: `/conlangs/${id}` })
    },
  },
}
</script>

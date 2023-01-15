<template>
  <CBox p="5%" class="container">
    <CBox>
      <CHeading fontSize="6xl">Browse</CHeading>
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
            @delete="openDelete"
          />
        </CBox>
      </CSimpleGrid>
    </CBox>
  </CBox>
</template>

<script>
import { query, getDocs, collection, where, orderBy } from 'firebase/firestore'
import { db } from '~/plugins/firebase'

export default {
  name: 'BrowseConlangs',
  data() {
    return {
      conlangs: [],
    }
  },
  async mounted() {
    const q = query(collection(db, 'conlangs'), orderBy('dateCreated', 'desc'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      let conlang = doc.data()
      conlang.id = doc.id
      this.conlangs.push(conlang)
    })
  },
}
</script>

<style lang="scss" scoped></style>

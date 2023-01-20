<template>
  <CBox>
    <CStack is-inline h="50vh" spacing-x="5%" p="0px">
      <CBox w="82.5%" mx="2.5%">
        <SoundGrid :conlangRef="conlangRef" :viewer="viewer" />
      </CBox>
      <CDivider
        orientation="vertical"
        my="2%"
        borderColor="gray.400"
        h="100vh"
      />
      <CBox w="17.5%" mx="2.5%">
        <PhonotacticsList :conlangRef="conlangRef" :viewer="viewer" />
      </CBox>
    </CStack>
  </CBox>
</template>

<script>
export default {
  name: 'Phonology',
  props: ['conlangRef', 'viewer'],
}
</script>

<style lang="scss" scoped></style>

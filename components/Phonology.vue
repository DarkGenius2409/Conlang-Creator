<template>
  <CBox>
    <CStack is-inline h="50vh" spacing-x="5%">
      <CBox w="75%" mx="2.5%">
        <SoundGrid :conlangRef="conlangRef" :viewer="viewer" />
      </CBox>

      <CBox w="25%" mx="2.5%">
        <PhonotacticsList
          :conlangRef="conlangRef"
          :viewer="viewer"
          @addRule="(rule) => $emit('addRule', rule)"
        />
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

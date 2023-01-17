<template>
  <CBox>
    <CStack is-inline h="100vh" spacing-x="5%">
      <CBox w="80%" mx="2.5%">
        <GrammarGrids :viewer="viewer" :conlangRef="conlangRef" />
      </CBox>
      <CDivider
        orientation="vertical"
        my="2%"
        borderColor="gray.400"
        h="100vh"
      />
      <CBox w="20%" mx="2.5%">
        <SyntaxRulesList :conlangRef="conlangRef" :viewer="viewer" />
      </CBox>
    </CStack>
  </CBox>
</template>

<script>
import SyntaxRulesList from './SyntaxRulesList.vue'

export default {
  name: 'Phonology',
  props: ['conlangRef', 'viewer'],
  components: { SyntaxRulesList },
}
</script>

<style lang="scss" scoped></style>

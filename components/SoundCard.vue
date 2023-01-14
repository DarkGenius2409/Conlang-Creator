<template>
  <CBox p="5%">
    <CStack
      @click="$emit('addSound', sound)"
      textAlign="center"
      :backgroundColor="backgroundColor"
      color="gray.900"
      w="100%"
      v-if="selected"
    >
      <CHeading>{{ sound.romanization }}</CHeading>
    </CStack>
    <CBox v-if="selected == false">
      <CButton @click="$emit('addSound', sound)">+</CButton>
    </CBox>
  </CBox>
</template>

<script>
export default {
  name: 'SoundCard',
  props: ['sound', 'selected'],
  computed: {
    backgroundColor() {
      return this.$props.selected ? 'blue.100' : 'white'
    },
  },
}
</script>

<style lang="scss" scoped></style>

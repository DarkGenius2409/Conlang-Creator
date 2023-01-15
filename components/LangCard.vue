<template>
  <CBox
    class="container"
    p="5%"
    w="100%"
    borderWidth="0.25rem"
    borderColor="blue.300"
    borderRadius="10"
  >
    <CStack>
      <CHeading>
        {{ name }}
        <span>
          <CButton
            @click="$emit('delete')"
            variant="outline"
            borderColor="red.600"
            color="red.600"
            >Delete</CButton
          >
        </span>
      </CHeading>
      <CText>{{ creator }} | created {{ month }} {{ date }}, {{ year }}</CText>
      <NuxtLink :to="`/conlangs/${id}`">
        <CButton bg="blue.600" color="white">Go To Conlang Page</CButton>
      </NuxtLink>
    </CStack>
  </CBox>
</template>

<script>
export default {
  name: 'LangCard',
  props: ['name', 'createdAt', 'creator', 'id'],
  computed: {
    date: function () {
      return new Date(this.$props.createdAt.seconds * 1000).getDate()
    },
    month: function () {
      const monthNum = new Date(this.$props.createdAt.seconds * 1000).getMonth()
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
    year: function () {
      return new Date(this.$props.createdAt.seconds * 1000).getFullYear()
    },
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="container">
    <CBox d="flex" w="99vw" h="100vh" py="15%" px="10%" textAlign="center">
      <CStack textAlign="center" w="100%">
        <CText class="title" color="blue.600">
          <i> Welcome to Conlang Creator</i>
        </CText>
        <CText fontSize="xl" color="black">
          The easiest way to get started with conlanging
        </CText>
      </CStack>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CButton,
  CAvatarGroup,
  CAvatar,
  CAvatarBadge,
  CModal,
  CModalContent,
  CModalOverlay,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIconButton,
  CFlex,
  CHeading,
  CText
} from '@chakra-ui/vue'

export default {
  name: 'IndexPage',
  components: {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading,
    CText
  },
}
</script>

<style>
.container {
  font-family: 'Titillium Web', sans-serif;
}
.title {
  font-size: 700%;
}

.titleName {
  margin-left: 50%;
}
</style>

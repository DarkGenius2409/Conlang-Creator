<template>
  <div>
    <CStack py="3%" pr="1%" pl="0" m="0">
      <CStack is-inline>
        <CText fontSize="3xl">Consonants</CText>
        <CButton
          @click="toggleConsonants"
          v-if="showEdit"
          mt="0.75%"
          size="sm"
          bg="blue.600"
          color="white"
        >
          {{ consonantEditText }}
        </CButton>
      </CStack>
      <CSimpleGrid :columns="13" text-align="center">
        <CBox maxW="3%" />
        <CBox
          v-for="(articulation, i) in articulations"
          :key="i"
          p="5%"
          minW="5%"
        >
          <CText class="articulation"> {{ articulation }}</CText>
        </CBox>
        <CBox class="articulation">Nasals</CBox>
        <CInput
          v-for="(sound, i) in nasals"
          :key="i"
          v-model="nasals[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox class="articulation">Plosives</CBox>
        <CInput
          v-for="(sound, i) in plosives"
          :key="i"
          v-model="plosives[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox class="articulation">Affricates</CBox>
        <CInput
          v-for="(sound, i) in affricates"
          :key="i"
          v-model="affricates[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox class="articulation">Fricatives</CBox>
        <CInput
          v-for="(sound, i) in fricatives"
          :key="i"
          v-model="fricatives[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox class="articulation">Approximants</CBox>
        <CInput
          v-for="(sound, i) in approximants"
          :key="i"
          v-model="approximants[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox class="articulation">Taps/Flaps</CBox>
        <CInput
          v-for="(sound, i) in tapsFlaps"
          :key="i"
          v-model="tapsFlaps[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox class="articulation">Trills</CBox>
        <CInput
          v-for="(sound, i) in trills"
          :key="i"
          v-model="trills[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox class="articulation">Clicks</CBox>
        <CInput
          v-for="(sound, i) in clicks"
          :key="i"
          v-model="clicks[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox class="articulation">Implosives</CBox>
        <CInput
          v-for="(sound, i) in implosives"
          :key="i"
          v-model="implosives[i]"
          :isReadOnly="!editConsonants"
          borderColor="blue.600"
          borderRadius="0"
        />
      </CSimpleGrid>
    </CStack>
    <CStack py="3%" pr="1%">
      <CStack is-inline>
        <CText fontSize="3xl">Vowels</CText>
        <CButton
          @click="toggleVowels"
          v-if="showEdit"
          mt="0.75%"
          size="sm"
          bg="blue.600"
          color="white"
          >{{ vowelEditText }}</CButton
        >
      </CStack>
      <CSimpleGrid :columns="4" maxW="50%" text-align="center">
        <CBox />
        <CBox v-for="(backness, i) in backnesses" :key="i">
          {{ backness }}
        </CBox>
        <CBox>Close</CBox>
        <CInput
          v-for="i in 3"
          :key="i"
          v-model="close[i - 1]"
          minW="4rem"
          :isReadOnly="!editVowels"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox>Near-close</CBox>
        <CInput
          v-for="i in 3"
          :key="i + 3"
          v-model="nearClose[i - 1]"
          :isReadOnly="!editVowels"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox>Close-mid</CBox>
        <CInput
          v-for="i in 3"
          :key="i + 6"
          v-model="closeMid[i - 1]"
          :isReadOnly="!editVowels"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox>Mid</CBox>
        <CInput
          v-for="i in 3"
          :key="i + 9"
          v-model="mid[i - 1]"
          :isReadOnly="!editVowels"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox>Open-mid</CBox>
        <CInput
          v-for="i in 3"
          :key="i + 12"
          v-model="openMid[i - 1]"
          :isReadOnly="!editVowels"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox>Near-open</CBox>
        <CInput
          v-for="i in 3"
          :key="i + 15"
          v-model="nearOpen[i - 1]"
          :isReadOnly="!editVowels"
          borderColor="blue.600"
          borderRadius="0"
        />
        <CBox>Open</CBox>
        <CInput
          v-for="i in 3"
          :key="i + 18"
          v-model="open[i - 1]"
          :isReadOnly="!editVowels"
          borderColor="blue.600"
          borderRadius="0"
        />
      </CSimpleGrid>
    </CStack>
  </div>
</template>

<script>
import { collection, getDocs, setDoc, getDoc, doc } from 'firebase/firestore'
import { auth, db } from '~/plugins/firebase'
import { v4 as uuidv4 } from 'uuid'
import { sounds } from '~/static/ipa'
import { onAuthStateChanged } from '@firebase/auth'

export default {
  name: 'SoundGrid',
  props: ['conlangRef', 'viewer'],
  data() {
    return {
      articulations: [
        'Bilabial',
        'Labiodental',
        'Linguolabial',
        'Dental',
        'Alveolar',
        'Post-alveolar',
        'Retroflex',
        'Palatal',
        'Velar',
        'Uvular',
        'Pharyngeal',
        'Glottal',
      ],
      backnesses: ['Front', 'Central', 'Back'],
      nasals: ['', '', '', '', '', '', '', '', '', '', '', ''],
      plosives: ['', '', '', '', '', '', '', '', '', '', '', ''],
      affricates: ['', '', '', '', '', '', '', '', '', '', '', ''],
      fricatives: ['', '', '', '', '', '', '', '', '', '', '', ''],
      approximants: ['', '', '', '', '', '', '', '', '', '', '', ''],
      tapsFlaps: ['', '', '', '', '', '', '', '', '', '', '', ''],
      trills: ['', '', '', '', '', '', '', '', '', '', '', ''],
      ejectiveStops: ['', '', '', '', ''],
      ejectiveAffricates: ['', '', '', '', ''],
      ejectiveFricatives: ['', '', '', '', ''],
      clicks: ['', '', '', '', ''],
      implosives: ['', '', '', '', ''],
      close: ['', '', ''],
      nearClose: ['', '', ''],
      closeMid: ['', '', ''],
      mid: ['', '', ''],
      openMid: ['', '', ''],
      nearOpen: ['', '', ''],
      open: ['', '', ''],
      editConsonants: false,
      editVowels: false,
      conlang: '',
    }
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const querySnapshot = await getDoc(this.conlangRef)
        this.conlang = querySnapshot.data()
        this.unwrapConsonantList(this.conlang.consonants)
        this.unwrapVowelList(this.conlang.vowels)
      }
    })
  },
  computed: {
    showEdit() {
      return this.viewer == this.conlang.creator
    },
    consonantEditText() {
      return this.editConsonants ? 'Save' : 'Edit'
    },
    vowelEditText() {
      return this.editVowels ? 'Save' : 'Edit'
    },
  },
  methods: {
    async addSound(sound) {
      let data = (await getDoc(this.conlangRef)).data()
      data.sounds.push(sound)
      await setDoc(docRef, data)
    },
    async toggleConsonants() {
      if (this.editConsonants == true) {
        this.conlang.consonants = this.wrapConsonantGrid()
        await setDoc(this.conlangRef, this.conlang)
        this.editConsonants = false
      } else {
        this.editConsonants = true
      }
    },
    async toggleVowels() {
      if (this.editVowels == true) {
        this.conlang.vowels = this.wrapVowelGrid()
        await setDoc(this.conlangRef, this.conlang)
        this.editVowels = false
      } else {
        this.editVowels = true
      }
    },
    wrapConsonantGrid() {
      let wrappedSounds = []
      for (let i = 0; i < this.nasals.length; i++) {
        wrappedSounds.push(this.nasals[i])
      }
      for (let i = 0; i < this.plosives.length; i++) {
        wrappedSounds.push(this.plosives[i])
      }
      for (let i = 0; i < this.affricates.length; i++) {
        wrappedSounds.push(this.affricates[i])
      }
      for (let i = 0; i < this.fricatives.length; i++) {
        wrappedSounds.push(this.fricatives[i])
      }
      for (let i = 0; i < this.approximants.length; i++) {
        wrappedSounds.push(this.approximants[i])
      }
      for (let i = 0; i < this.tapsFlaps.length; i++) {
        wrappedSounds.push(this.tapsFlaps[i])
      }
      for (let i = 0; i < this.trills.length; i++) {
        wrappedSounds.push(this.trills[i])
      }
      for (let i = 0; i < this.clicks.length; i++) {
        wrappedSounds.push(this.clicks[i])
      }
      for (let i = 0; i < this.implosives.length; i++) {
        wrappedSounds.push(this.implosives[i])
      }
      return wrappedSounds
    },
    unwrapConsonantList(soundList) {
      for (let i = 0; i < this.articulations.length; i++) {
        this.nasals[i] = soundList[i]
      }
      for (let i = 0; i < this.articulations.length; i++) {
        this.plosives[i] = soundList[i + 12]
      }
      for (let i = 0; i < this.articulations.length; i++) {
        this.affricates[i] = soundList[i + 24]
      }
      for (let i = 0; i < this.articulations.length; i++) {
        this.fricatives[i] = soundList[i + 36]
      }
      for (let i = 0; i < this.articulations.length; i++) {
        this.approximants[i] = soundList[i + 48]
      }
      for (let i = 0; i < this.articulations.length; i++) {
        this.tapsFlaps[i] = soundList[i + 60]
      }
      for (let i = 0; i < this.articulations.length; i++) {
        this.trills[i] = soundList[i + 72]
      }
      for (let i = 0; i < this.articulations.length; i++) {
        this.clicks[i] = soundList[i + 84]
      }
      for (let i = 0; i < this.articulations.length; i++) {
        this.implosives[i] = soundList[i + 96]
      }
    },
    wrapVowelGrid() {
      let wrappedSounds = []
      for (let i = 0; i < this.close.length; i++) {
        wrappedSounds.push(this.close[i])
      }
      for (let i = 0; i < this.nearClose.length; i++) {
        wrappedSounds.push(this.nearClose[i])
      }
      for (let i = 0; i < this.closeMid.length; i++) {
        wrappedSounds.push(this.closeMid[i])
      }
      for (let i = 0; i < this.mid.length; i++) {
        wrappedSounds.push(this.mid[i])
      }
      for (let i = 0; i < this.openMid.length; i++) {
        wrappedSounds.push(this.openMid[i])
      }
      for (let i = 0; i < this.nearOpen.length; i++) {
        wrappedSounds.push(this.nearOpen[i])
      }
      for (let i = 0; i < this.open.length; i++) {
        wrappedSounds.push(this.open[i])
      }
      return wrappedSounds
    },
    unwrapVowelList(soundList) {
      for (let i = 0; i < this.backnesses.length; i++) {
        this.close[i] = soundList[i]
      }
      for (let i = 0; i < this.backnesses.length; i++) {
        this.nearClose[i] = soundList[i + 3]
      }
      for (let i = 0; i < this.backnesses.length; i++) {
        this.closeMid[i] = soundList[i + 6]
      }
      for (let i = 0; i < this.backnesses.length; i++) {
        this.mid[i] = soundList[i + 9]
      }
      for (let i = 0; i < this.backnesses.length; i++) {
        this.openMid[i] = soundList[i + 12]
      }
      for (let i = 0; i < this.backnesses.length; i++) {
        this.nearOpen[i] = soundList[i + 15]
      }
      for (let i = 0; i < this.backnesses.length; i++) {
        this.open[i] = soundList[i + 18]
      }
    },
  },
}
</script>

<style scoped>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
}

.articulation {
  font-size: 72.5%;
}
</style>

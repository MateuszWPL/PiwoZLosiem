<template>
  <component :is="icons[name]" v-bind="$attrs" v-if="icons[name]" />
  <span v-else class="text-red-500">❌ brak ikony: {{ name }}</span>
</template>

<script setup>
import { computed } from 'vue'

import BeerIcon from './BeerIcon.vue'
import FriendsIcon from './FriendsIcon.vue'
import RankingIcon from './RankingIcon.vue'
import BadgeIcon from './BadgeIcon.vue'
import TrophyIcon from './TrophyIcon.vue'
import ShieldIcon from './ShieldIcon.vue'
import StarIcon from './StarIcon.vue'
import MedalIcon from './MedalIcon.vue'
import LocalizationIcon from './LocalizationIcon.vue'
import ChatIcon from './ChatIcon.vue'
import CancellIcon from './CancellIcon.vue'


const icons = {
  beer: BeerIcon,
  friends: FriendsIcon,
  ranking: RankingIcon,
  badge: BadgeIcon,
  trophy: TrophyIcon,
  shield: ShieldIcon,
  star: StarIcon,
  medal: MedalIcon,
  localization: LocalizationIcon,
  chat: ChatIcon,
  cancell: CancellIcon,
}

defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

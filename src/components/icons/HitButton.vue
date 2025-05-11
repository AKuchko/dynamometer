<script setup lang="ts">
import { computed } from 'vue'

const { pushed } = defineProps<{
  pushed?: boolean;
}>()

const currentViewBox = computed(() => {
  return pushed
    ? '0 0 124 60'
    : '0 0 124 64'
})
</script>

<template>
  <svg fill="none" :viewBox="currentViewBox" width="124" xmlns="http://www.w3.org/2000/svg">
    <template v-if="pushed">
      <path d="M18 0h88l18 35H0L18 0Z" fill="url(#a)"/>
      <path d="M0 35h124v25H0V35Z" fill="url(#b)"/>
      <ellipse cx="62.31" cy="18.25" fill="#C53030" rx="33.31" ry="8.99"/>
      <ellipse cx="62.31" cy="17.99" fill="#F65A5A" rx="33.31" ry="8.99"/>
      <ellipse cx="62.31" cy="17" fill="url(#d)" fill-opacity=".4" rx="32" ry="8"/>
    </template>
    <template v-else>
      <path d="M18 8h88l18 35H0L18 8Z" fill="url(#a)"/>
      <path d="M0 43h124v25H0V43Z" fill="url(#b)"/>
      <path clip-rule="evenodd" d="M95.63 8.92H29v17.85h.06c1 4.72 15.5 8.47 33.25 8.47s32.26-3.75 33.26-8.47h.06V8.92Z" fill="#DE1D1D" fill-rule="evenodd"/>
      <path clip-rule="evenodd" d="M95.63 8.92H29v17.85h.06c1 4.72 15.5 8.47 33.25 8.47s32.26-3.75 33.26-8.47h.06V8.92Z" fill="url(#c)" fill-rule="evenodd"/>
      <ellipse cx="62.31" cy="8.99" fill="#F65A5A" rx="33.31" ry="8.99"/>
      <ellipse cx="62.31" cy="8" fill="url(#d)" fill-opacity=".4" rx="32" ry="8"/>
    </template>
    <defs>
      <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="62" x2="62" y1="68" y2="34.82">
        <stop stop-color="#73C4E7"/>
        <stop offset="1" stop-color="#141893"/>
      </linearGradient>
      <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="62.31" x2="62.31" y1="8.92" y2="35.24">
        <stop stop-color="#D90000"/>
        <stop offset="1" stop-color="#A60000"/>
      </linearGradient>
      <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="32.31" x2="68.31" y1="6.5" y2="6.5">
        <stop stop-color="#fff"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="a" cx="0" cy="0" gradientTransform="matrix(0 17.5 -62 0 62 25.5)" gradientUnits="userSpaceOnUse" r="1">
        <stop stop-color="#6C99D1"/>
        <stop offset="1" stop-color="#142563"/>
      </radialGradient>
    </defs>
  </svg>
</template>

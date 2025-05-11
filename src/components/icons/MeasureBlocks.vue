<script setup lang="ts">
import { computed } from 'vue'
import type { CSSClasses } from '@/types'

const { level } = defineProps<{
  level: number
}>()

const rootCssClasses = computed((): CSSClasses => ({
  'measure-blocks--reached-1': level >= 1,
  'measure-blocks--reached-2': level >= 2,
  'measure-blocks--reached-3': level >= 3,
  'measure-blocks--reached-4': level >= 4,
  'measure-blocks--reached-5': level >= 5,
  'measure-blocks--reached-6': level >= 6,
  'measure-blocks--reached-7': level >= 7,
  'measure-blocks--reached-8': level >= 8,
}))
</script>

<template>
  <svg
    class="measure-blocks"
    :class="rootCssClasses"
    fill="none"
    viewBox="0 0 79 301"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="#080B3A" height="47" rx="4" width="73" x="2.5"/>
    <rect class="measure-blocks__lvl-8" fill="url(#price-idle)" height="47" rx="4" width="73" x="2.5"/>
    <rect class="measure-blocks__lvl-7" fill="#D1DEFB" height="26" rx="5" stroke="#080B3A" stroke-width="2" width="76" x="1.5" y="53"/>
    <path class="measure-blocks__lvl-6" d="M1.5 73h76v27h-76z" fill="#B7C8ED" stroke="#080B3A" stroke-width="2"/>
    <path class="measure-blocks__lvl-5" d="M1.5 98h76v32h-76z" fill="#94AADC" stroke="#080B3A" stroke-width="2"/>
    <path class="measure-blocks__lvl-4" d="M1.5 128h76v37h-76z" fill="#7593D6" stroke="#080B3A" stroke-width="2"/>
    <path class="measure-blocks__lvl-3" d="M1.5 163h76v42h-76z" fill="#5878BE" stroke="#080B3A" stroke-width="2"/>
    <path class="measure-blocks__lvl-2" d="M1.5 203h76v47h-76z" fill="#3A5CA5" stroke="#080B3A" stroke-width="2"/>
    <path class="measure-blocks__lvl-1" d="M1.5 248h76v52h-76z" fill="#254B9D" stroke="#080B3A" stroke-width="2"/>
    <path d="M3.5 76h71v3h-71zm0-20h71v3h-71z" fill="#fff" fill-opacity=".3"/>
    <path d="M71.5 76h3v19h-3zm0-20h3v14h-3zm0 45h3v24h-3zm0 30h3v29h-3zm0 35h3v34h-3zm0 40h3v39h-3zm0 45h3v46h-3z" fill="#fff" fill-opacity=".3"/>
    <path d="M3.5 101h71v3h-71zm0 30h71v3h-71zm0 35h71v3h-71zm0 40h71v3h-71zm0 45h71v3h-71z" fill="#fff" fill-opacity=".3"/>
    <defs>
      <linearGradient id="price-idle" gradientUnits="userSpaceOnUse" x1="39" x2="39" y1="0" y2="47">
        <stop stop-color="#B676CB"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="price-reached" gradientUnits="userSpaceOnUse" x1="39" x2="39" y1="0" y2="47">
        <stop stop-color="#FF9191"/>
        <stop offset="1" stop-color="#FF0303"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
.measure-blocks--reached-1 .measure-blocks__lvl-1 {
  fill: #00B047;
}

.measure-blocks--reached-2 .measure-blocks__lvl-2 {
  fill: #00D355;
}

.measure-blocks--reached-3 .measure-blocks__lvl-3 {
  fill: #91E508;
}

.measure-blocks--reached-4 .measure-blocks__lvl-4 {
  fill: #FFDF35;
}

.measure-blocks--reached-5 .measure-blocks__lvl-5 {
  fill: #FFAE4E;
}

.measure-blocks--reached-6 .measure-blocks__lvl-6 {
  fill: #FF784E;
}

.measure-blocks--reached-7 .measure-blocks__lvl-7 {
  fill: #F65A5A;
}

.measure-blocks--reached-8 .measure-blocks__lvl-8 {
  fill: url(#price-reached);
}
</style>

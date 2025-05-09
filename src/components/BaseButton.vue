<script setup lang="ts">
interface BaseButtonProps {
  theme?: 'pink' | 'yellow';
  disabled?: boolean;
}

const { theme = 'pink' } = defineProps<BaseButtonProps>();
</script>

<template>
  <button
    class="base-button"
    :class="`base-button--${theme}`"
  >
    <slot />
  </button>
</template>

<style>
.base-button {
  height: 36px;
  min-width: 172px;
  border-radius: 4px;

  border-width: 1px;
  border-style: solid;

  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
}

.base-button--pink {
  color: var(--color-text);
  border-color: var(--color-text);
  background: var(--color-pink);
}

.base-button--yellow {
  color: var(--color-dark-pink);
  border-color: var(--color-dark-pink);
  background: var(--color-yellow);
}
</style>

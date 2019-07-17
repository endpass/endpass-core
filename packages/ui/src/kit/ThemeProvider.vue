<template>
  <div>
    <div
      :style="{
        position: 'absolute',
        height: '1px',
        width: '1px',
        overflow: 'hidden',
        clip: 'rect(1px, 1px, 1px, 1px)',
      }"
      v-html="sprites"
    />
    <slot />
  </div>
</template>

<script>
import sprites from '@/assets/svg/icons.svg';

export default {
  name: 'ThemeProvider',

  provide() {
    return {
      theme: this.theme,
    };
  },

  props: {
    theme: {
      type: String,
      default: 'default',
    },
  },

  data: () => ({
    sprites,
  }),
};
</script>

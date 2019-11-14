<template>
  <div
    class="v-accordion"
    :class="themeCssClass"
  >
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VAccordion',
  mixins: [ThemeMixin],
};
</script>

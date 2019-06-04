<template>
  <div :class="themeCssClass">
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'IconAtom',
  mixins: [ThemeMixin],
};
</script>

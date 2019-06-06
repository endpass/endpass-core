<template>
  <i :class="themeCssClass">
    <slot />
  </i>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'IconAtom',
  mixins: [ThemeMixin],
};
</script>

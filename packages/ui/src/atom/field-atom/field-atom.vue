<template>
  <div
    :class="themeCssClass"
    class="v-field-atom"
  >
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'FieldAtom',
  mixins: [ThemeMixin],
};
</script>

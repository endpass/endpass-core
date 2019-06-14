<template>
  <div
    class="field-atom"
    :class="themeCssClass"
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

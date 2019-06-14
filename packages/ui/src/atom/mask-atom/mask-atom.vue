<template>
  <div
    class="mask-atom"
    :class="themeCssClass"
  >
    <div
      class="mask-atom-centered"
      @click.self="$emit('click', $event)"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'MaskAtom',
  mixins: [ThemeMixin],
};
</script>

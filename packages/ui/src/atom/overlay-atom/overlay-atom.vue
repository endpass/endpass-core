<template>
  <div
    class="overlay-atom"
    role="button"
    :class="themeCssClass"
    @click.self="$emit('click', $event)"
  >
    <slot/>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'OverlayAtom',
  mixins: [ThemeMixin],
};
</script>

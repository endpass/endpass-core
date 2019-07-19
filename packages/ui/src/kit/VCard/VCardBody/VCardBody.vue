<template>
  <div
    class="v-card-body"
    :class="themeCssClass"
  >
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VCardBody',
  mixins: [ThemeMixin],
};
</script>

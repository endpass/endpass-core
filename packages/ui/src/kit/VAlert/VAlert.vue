<template>
  <div :class="vAlertCssClass">
    <div class="v-alert-icon">
      <svg-atom name="error" />
    </div>
    <div class="v-alert-content">
      <slot />
    </div>
    <div class="v-alert-button">
      <icon-button-atom
        height="10px"
        width="10px"
        icon="close"
        @click="onCloseClick"
      />
    </div>
  </div>
</template>

<script>
import SvgAtom from '@/atom/svg-atom/svg-atom.vue';
import IconButtonAtom from '@/atom/icon-button-atom/icon-button-atom.vue';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VAlert',

  computed: {
    vAlertCssClass() {
      return {
        ...this.themeCssClass,
        'v-alert': true,
      };
    },
  },

  methods: {
    onCloseClick() {
      this.$emit('close');
    },
  },

  mixins: [ThemeMixin],

  components: {
    IconButtonAtom,
    SvgAtom,
  },
};
</script>

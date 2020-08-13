<template>
  <a
    class="v-link-collapse"
    :class="vLinkCollapseClass"
    role="button"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
    <svg-atom
      class="v-link-collapse-chevron"
      name="chevron-up"
      width="17px"
      height="17px"
    />
  </a>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import SvgAtom from '@/atom/svg-atom/svg-atom.vue';

export default {
  name: 'VIndicator',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    vLinkCollapseClass() {
      return {
        ...this.themeCssClass,
        'is-collapsed': this.isCollapsed,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
  },
};
</script>

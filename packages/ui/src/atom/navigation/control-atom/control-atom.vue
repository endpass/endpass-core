<template>
  <a
    :class="controlCssClass"
    :href="href"
    :role="controlRole"
    @click="emitClick"
  >
    <slot />
  </a>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'NavigationControlAtom',

  props: {
    href: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    controlCssClass() {
      return Object.assign(this.themeCssClass, {
        'navigation-control-atom': true,
        'is-active': this.isActive,
      });
    },

    controlRole() {
      return this.href ? null : 'button';
    },
  },

  methods: {
    emitClick() {
      this.$emit('click');
    },
  },

  mixins: [ThemeMixin],
};
</script>

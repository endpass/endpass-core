<template>
  <a
    :class="sidebarControlCssClass"
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
  name: 'NavigationSidebarControlAtom',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

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
    sidebarControlCssClass() {
      return Object.assign(this.themeCssClass, {
        'navigation-sidebar-control-atom': true,
        'is-disabled': this.disabled,
        'is-active': this.isActive,
      });
    },

    controlRole() {
      return this.href ? null : 'button';
    },
  },

  methods: {
    emitClick() {
      if (this.disabled) return;

      this.$emit('click');
    },
  },

  mixins: [ThemeMixin],
};
</script>

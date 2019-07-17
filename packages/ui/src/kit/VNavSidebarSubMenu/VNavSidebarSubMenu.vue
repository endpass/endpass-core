<template>
  <section :class="vNavSidebarSubMenuCssClass">
    <navigation-sidebar-control
      :disabled="disabled"
      @click="handleContentToggle"
    >
      <i
        v-if="isWithIcon"
        class="v-nav-sidebar-sub-menu-icon additional"
      >
        <slot name="icon" />
        <svg-atom
          v-if="!isIconSlotFilled"
          :name="icon"
        />
      </i>
      {{ label }}
      <i class="v-nav-sidebar-sub-menu-icon chevron">
        <svg-atom :name="currentIcon" />
      </i>
    </navigation-sidebar-control>
    <section class="v-nav-sidebar-sub-menu-content">
      <slot />
    </section>
  </section>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import SvgAtom from '@/atom/svg-atom/svg-atom';
/* eslint-disable-next-line */
import NavigationSidebarControl from '@/atom/navigation/sidebar-control/sidebar-control';

export default {
  name: 'VNavSidebarSubMenu',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    isExpanded: false,
  }),

  computed: {
    vNavSidebarSubMenuCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-nav-sidebar-sub-menu': true,
        'is-expanded': this.isExpanded,
        'is-iconed': this.isWithIcon,
      });
    },

    currentIcon() {
      if (this.isExpanded) {
        return 'chevron-up';
      }

      return 'chevron-down';
    },

    isIconSlotFilled() {
      return !!this.$slots.icon;
    },

    isWithIcon() {
      return this.isIconSlotFilled || this.icon;
    },
  },

  methods: {
    handleContentToggle() {
      this.isExpanded = !this.isExpanded;
    },
  },

  mixins: [ThemeMixin],

  components: {
    NavigationSidebarControl,
    SvgAtom,
  },
};
</script>

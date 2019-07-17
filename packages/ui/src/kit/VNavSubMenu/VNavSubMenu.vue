<template>
  <section
    :class="vNavSubMenuCssClass"
    class="v-nav-sub-menu"
  >
    <navigation-control-atom @click="handleOpenContent">
      {{ label }}
      <i class="v-nav-sub-menu-icon">
        <svg-atom :name="currentIcon" />
      </i>
    </navigation-control-atom>
    <section
      ref="list"
      class="v-nav-sub-menu-content"
    >
      <slot />
    </section>
  </section>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import NavigationControlAtom from '@/atom/navigation/control-atom/control-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';

export default {
  name: 'VNavSubMenu',

  props: {
    label: {
      type: String,
      required: true,
    },

    items: {
      type: Array,
      default: () => [],
    },

    activePathname: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    isExpanded: false,
  }),

  computed: {
    vNavSubMenuCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-expanded': this.isExpanded,
      });
    },

    currentIcon() {
      if (this.isExpanded) {
        return 'chevron-up';
      }

      return 'chevron-down';
    },
  },

  methods: {
    handleOpenContent() {
      if (this.isExpanded) {
        this.isExpanded = false;
        return;
      }

      this.isExpanded = true;

      setImmediate(this.addCloseHandlers);
    },

    handleClickOutsideOnce(e) {
      if (e.type === 'click' || e.keyCode === 27) {
        this.isExpanded = false;
        this.removeCloseHandlers();
      }
    },

    addCloseHandlers() {
      document.body.addEventListener('click', this.handleClickOutsideOnce);
      window.addEventListener('keydown', this.handleClickOutsideOnce);
    },

    removeCloseHandlers() {
      document.body.removeEventListener('click', this.handleClickOutsideOnce);
      window.removeEventListener('keydown', this.handleClickOutsideOnce);
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
    NavigationControlAtom,
  },
};
</script>

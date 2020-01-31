<template>
  <outside-click-atom @click="onClickOutside">
    <close-by-key-atom @close="onESCPress">
      <section :class="vNavSubMenuCssClass" class="v-nav-sub-menu">
        <navigation-control-atom :skin="skin" @click="handleOpenContent">
          {{ label }}
          <i class="v-nav-sub-menu-icon">
            <svg-atom :name="currentIcon" />
          </i>
        </navigation-control-atom>
        <section class="v-nav-sub-menu-content">
          <slot />
        </section>
      </section>
    </close-by-key-atom>
  </outside-click-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import NavigationControlAtom from '@/atom/navigation/control-atom/control-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';
import OutsideClickAtom from '@/atom/outside-click-atom/outside-click-atom';
import CloseByKeyAtom from '@/atom/close-by-key-atom/close-by-key-atom';

export default {
  name: 'VNavSubMenu',

  props: {
    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].includes(value);
      },
    },

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
        [`skin-${this.skin}`]: !!this.skin,
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
    onClickOutside() {
      this.isExpanded = false;
    },

    onESCPress() {
      this.isExpanded = false;
    },

    handleOpenContent() {
      if (this.isExpanded) {
        this.isExpanded = false;
        return;
      }

      this.isExpanded = true;

      setTimeout(this.addCloseHandlers, 50);
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
    NavigationControlAtom,
    OutsideClickAtom,
    CloseByKeyAtom,
  },
};
</script>

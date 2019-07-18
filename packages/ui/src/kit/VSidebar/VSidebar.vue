<template>
  <div
    class="v-sidebar"
    :class="sideBarCssClass"
  >
    <div
      class="v-sidebar-container"
      :class="containerCssClass"
    >
      <aside class="v-sidebar-aside">
        <slot />
      </aside>
    </div>
    <slot name="overlay" />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VSidebar',
  props: {
    direction: {
      type: String,
      default: 'left',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sideBarCssClass() {
      return Object.assign({}, this.themeCssClass, {
        'is-open': this.isOpen,
        'is-closed': this.isOpen === false,
      });
    },
    containerCssClass() {
      return Object.assign({}, this.themeCssClass, {
        'is-right': this.direction === 'right',
        'is-left': this.direction === 'left',
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>

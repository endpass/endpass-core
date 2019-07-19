<template>
  <a
    :class="vSuperSidebarControlCssClass"
    :href="href"
    :role="controlRole"
    @click="handleClick"
  >
    <i class="v-super-menu-control-icon">
      <svg-atom :name="icon" />
    </i>
    <slot />
  </a>
</template>

<script>
import SvgAtom from '@/atom/svg-atom/svg-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VSuperMenuControl',

  props: {
    href: {
      type: String,
      default: null,
    },

    icon: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    isGapped: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    vSuperSidebarControlCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-super-menu-control': true,
        'is-active': this.isActive,
        'is-gapped': this.isGapped,
      });
    },

    controlRole() {
      return this.href ? null : 'button';
    },
  },

  methods: {
    handleClick() {
      this.$emit('click');
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
  },
};
</script>

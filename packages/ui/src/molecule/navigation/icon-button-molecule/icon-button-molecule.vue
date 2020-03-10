<template>
  <button
    :class="iconButtonCssClass"
    @click="emitClick"
  >
    <slot />
    <svg-atom
      v-if="!isIconSlotFilled"
      :name="icon"
    />
  </button>
</template>

<script>
import SvgAtom from '@/atom/svg-atom/svg-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'NavigationIconButtonAtom',

  props: {
    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].includes(value);
      },
    },

    icon: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iconButtonCssClass() {
      return Object.assign(this.themeCssClass, {
        'navigation-icon-button-molecule': true,
        'is-active': this.isActive,
        [`skin-${this.skin}`]: !!this.skin,
      });
    },

    isIconSlotFilled() {
      return !!this.$slots.default;
    },

    isWithIcon() {
      return this.isIconSlotFilled || this.icon;
    },
  },

  methods: {
    emitClick() {
      this.$emit('click');
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
  },
};
</script>

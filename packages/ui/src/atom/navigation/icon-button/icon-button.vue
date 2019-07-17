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
  name: 'NavigationIconButton',

  props: {
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
        'navigation-icon-button': true,
        'is-active': this.isActive,
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

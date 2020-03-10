<template>
  <button
    :class="iconButtonCssClass"
    :width="width"
    :height="height"
    @click="emitClick"
  >
    <slot />
    <svg-atom
      v-if="!isIconSlotFilled"
      :width="width"
      :height="height"
      :name="icon"
    />
  </button>
</template>

<script>
import SvgAtom from '@/atom/svg-atom/svg-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'NavigationIconButtonMolecule',

  props: {
    icon: {
      type: String,
      default: null,
    },

    height: {
      type: String,
      default: '32px',
    },

    width: {
      type: String,
      default: '32px',
    },
  },

  computed: {
    iconButtonCssClass() {
      return Object.assign(this.themeCssClass, {
        'icon-button-molecule': true,
      });
    },

    isIconSlotFilled() {
      return !!this.$slots.default;
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

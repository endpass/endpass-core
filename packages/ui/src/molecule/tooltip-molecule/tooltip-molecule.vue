<template>
  <hover-atom
    v-if="label"
    v-slot:default="{ isHover }"
    class="tooltip-molecule"
    :class="themeCssClass"
  >
    <tooltip-atom
      :show="isHover"
      position="bottom-left"
    >
      {{ label }}
    </tooltip-atom>
    <icon-atom class="tooltip-molecule-icon">
      <svg-atom :name="icon" />
    </icon-atom>
  </hover-atom>
</template>

<script>
import IconAtom from '@/atom/icon-atom/icon-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';
import HoverAtom from '@/atom/hover-atom/hover-atom';
import TooltipAtom from '@/atom/tooltip-atom/tooltip-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'TooltipMolecule',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
      default: 'info',
    },
  },

  mixins: [ThemeMixin],

  components: {
    TooltipAtom,
    HoverAtom,
    IconAtom,
    SvgAtom,
  },
};
</script>

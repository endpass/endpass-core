<template>
  <hover-atom
    v-slot:default="{ isHover }"
    class="icon-tooltip-molecule"
    :class="themeCssClass"
  >
    <tooltip-atom
      :show="isHover"
      position="bottom-left"
    >
      <slot />
    </tooltip-atom>
    <icon-atom class="icon-tooltip-molecule-icon">
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
  name: 'LabelTooltipMolecule',

  props: {
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

<template>
  <label-atom
    class="label-molecule"
    :label="label"
    :disabled="disabled"
  >
    <hover-atom
      v-if="tooltipLabel || $slots.tooltip"
      v-slot:default="{ isHover }"
      class="label-molecule-tooltip"
      :class="themeCssClass"
    >
      <tooltip-atom
        :show="isHover"
        position="bottom-left"
      >
        <template v-if="tooltipLabel">
          {{ tooltipLabel }}
        </template>
        <slot
          v-else
          name="tooltip"
        />
      </tooltip-atom>
      <icon-atom class="label-molecule-icon">
        <svg-atom :name="icon" />
      </icon-atom>
    </hover-atom>
  </label-atom>
</template>

<script>
import IconAtom from '@/atom/icon-atom/icon-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';
import HoverAtom from '@/atom/hover-atom/hover-atom';
import TooltipAtom from '@/atom/tooltip-atom/tooltip-atom';
import ThemeMixin from '@/mixins/ThemeMixin';
import LabelAtom from '@/atom/label-atom/label-atom';

export default {
  name: 'LabelMolecule',

  props: {
    label: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    tooltipLabel: {
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
    LabelAtom,
    TooltipAtom,
    HoverAtom,
    IconAtom,
    SvgAtom,
  },
};
</script>

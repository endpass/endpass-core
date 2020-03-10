<template>
  <field-atom class="v-input">
    <label-atom v-if="label || tooltipLabel">
      {{ label }}
      <icon-tooltip-molecule
        v-if="tooltipLabel"
        class="v-input-icon-tooltip"
      >
        {{ tooltipLabel }}
      </icon-tooltip-molecule>
    </label-atom>
    <description-atom
      v-if="description"
      v-bind="$attrs"
      :description="description"
    />
    <input-atom
      :value="value"
      :is-error="isError"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <icon-atom
        v-if="isError"
        :is-error="isError"
      >
        <svg-atom name="error" />
      </icon-atom>
    </input-atom>
    <error-atom
      v-if="isError"
      :error="error"
    />
  </field-atom>
</template>

<script>
import InputAtom from '@/atom/input-atom/input-atom';
import LabelAtom from '@/atom/label-atom/label-atom';
import FieldAtom from '@/atom/field-atom/field-atom';
import ErrorAtom from '@/atom/error-atom/error-atom';
import DescriptionAtom from '@/atom/description-atom/description-atom';
import IconAtom from '@/atom/icon-atom/icon-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';
import IconTooltipMolecule from '@/molecule/icon-tooltip-molecule/icon-tooltip-molecule';

export default {
  name: 'VInput',

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: '',
    },

    tooltipLabel: {
      type: String,
      default: '',
    },

    value: {
      type: [String, Number],
      default: null,
    },

    error: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },
  },

  computed: {
    isError() {
      return !!this.error;
    },
  },

  components: {
    IconTooltipMolecule,
    InputAtom,
    LabelAtom,
    FieldAtom,
    ErrorAtom,
    DescriptionAtom,
    IconAtom,
    SvgAtom,
  },

  model: {
    event: 'input',
    prop: 'value',
  },
};
</script>

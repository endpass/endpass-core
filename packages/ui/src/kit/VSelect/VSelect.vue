<template>
  <field-atom class="v-select">
    <label-molecule
      v-if="label"
      :label="label"
      :tooltip-label="tooltipLabel"
      :disabled="disabled"
    />
    <description-atom
      v-if="description"
      v-bind="$attrs"
      :description="description"
    />
    <select-atom
      :value="value"
      :is-error="isError"
      :options="options"
      :skin="skin"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <icon-atom
        v-if="isError"
        :is-error="isError"
        class="v-select-icon-error"
      >
        <svg-atom name="error" />
      </icon-atom>
    </select-atom>
    <error-atom
      v-if="isError"
      :error="error"
    />
  </field-atom>
</template>

<script>
import IconAtom from '@/atom/icon-atom/icon-atom';
import SelectAtom from '@/atom/select-atom/select-atom';
import FieldAtom from '@/atom/field-atom/field-atom';
import ErrorAtom from '@/atom/error-atom/error-atom';
import DescriptionAtom from '@/atom/description-atom/description-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';
import LabelMolecule from '@/molecule/label-molecule/label-molecule';

export default {
  name: 'VSelect',

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: null,
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
      default: null,
    },

    description: {
      type: String,
      default: null,
    },

    options: {
      type: Array,
      default: () => [],
    },

    skin: {
      type: String,
      default: 'primary',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isError() {
      return !!this.error;
    },
  },

  components: {
    LabelMolecule,
    IconAtom,
    SelectAtom,
    FieldAtom,
    ErrorAtom,
    DescriptionAtom,
    SvgAtom,
  },

  model: {
    event: 'input',
    prop: 'value',
  },
};
</script>

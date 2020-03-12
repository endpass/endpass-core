<template>
  <field-atom>
    <label-molecule
      v-if="label"
      :label="label"
      :tooltip-label="tooltipLabel"
      v-bind="$attrs"
    />
    <description-atom
      v-if="description"
      v-bind="$attrs"
      :description="description"
    />
    <textarea-atom
      :value="value"
      :is-error="isError"
      :class="skinCssClass"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <icon-atom
        v-if="isError"
        :is-error="isError"
      >
        <svg-atom name="error" />
      </icon-atom>
    </textarea-atom>
    <error-atom
      v-if="isError"
      :error="error"
    />
  </field-atom>
</template>

<script>
import TextareaAtom from '@/atom/textarea-atom/textarea-atom';
import FieldAtom from '@/atom/field-atom/field-atom';
import ErrorAtom from '@/atom/error-atom/error-atom';
import DescriptionAtom from '@/atom/description-atom/description-atom';
import IconAtom from '@/atom/icon-atom/icon-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';
import LabelMolecule from '@/molecule/label-molecule/label-molecule';

export default {
  name: 'VTextarea',

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: null,
    },

    tooltipLabel: {
      type: String,
      default: null,
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

    skin: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'white'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    isError() {
      return !!this.error;
    },

    skinCssClass() {
      return `skin-${this.skin}`;
    },
  },

  components: {
    LabelMolecule,
    TextareaAtom,
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

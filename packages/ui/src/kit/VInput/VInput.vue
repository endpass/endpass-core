<template>
  <field-atom
    class="v-input"
    :class="themeCssClass"
  >
    <label-molecule
      v-if="label"
      :label="label"
      :disabled="disabled"
      :tooltip-label="tooltipLabel"
    />
    <description-atom
      v-if="description"
      v-bind="$attrs"
      :description="description"
    />
    <input-atom
      :value="value"
      :is-error="isError"
      :disabled="disabled"
      :skin="skin"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <icon-atom
        v-if="isLoading"
        class="v-input-loader"
      >
        <inline-loader-molecule />
      </icon-atom>
      <icon-atom
        v-if="isError"
        :is-error="isError"
        class="v-input-error-icon"
      >
        <svg-atom name="error" />
      </icon-atom>
      <icon-button-molecule
        v-if="isResetAllowed"
        class="v-input-reset-button"
        icon="close-circle-filled"
        height="14"
        width="14"
        @click="onResetClick"
      />
    </input-atom>
    <error-atom
      v-if="isError"
      :error="error"
    />
  </field-atom>
</template>

<script>
import InlineLoaderMolecule from '@/molecule/inline-loader-molecule/inline-loader-molecule';
import IconButtonMolecule from '@/molecule/icon-button-molecule/icon-button-molecule';
import InputAtom from '@/atom/input-atom/input-atom';
import FieldAtom from '@/atom/field-atom/field-atom';
import ErrorAtom from '@/atom/error-atom/error-atom';
import DescriptionAtom from '@/atom/description-atom/description-atom';
import IconAtom from '@/atom/icon-atom/icon-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';
import LabelMolecule from '@/molecule/label-molecule/label-molecule';

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

    disabled: {
      type: Boolean,
      default: false,
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    isResetable: {
      type: Boolean,
      default: false,
    },

    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    isError() {
      return !!this.error;
    },

    isResetAllowed() {
      return this.isResetable && !this.disabled;
    },
  },

  methods: {
    onResetClick() {
      this.$emit('input', '');
    },
  },

  components: {
    LabelMolecule,
    InputAtom,
    FieldAtom,
    ErrorAtom,
    DescriptionAtom,
    IconAtom,
    SvgAtom,
    InlineLoaderMolecule,
    IconButtonMolecule,
  },

  model: {
    event: 'input',
    prop: 'value',
  },
};
</script>

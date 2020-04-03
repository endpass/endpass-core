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
      <v-progress-circle
        v-if="isLoading"
        progress="10"
        size="inline"
        class="v-input-loader"
      />
      <icon-atom
        v-if="isError"
        :is-error="isError"
        class="v-input-error-icon"
      >
        <svg-atom name="error" />
      </icon-atom>
      <icon-button-molecule
        v-if="isResetable"
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
import VProgressCircle from '@/kit/VProgressCircle';
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
  },

  methods: {
    onResetClick() {
      this.$emit('reset');
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
    VProgressCircle,
    IconButtonMolecule,
  },

  model: {
    event: 'input',
    prop: 'value',
  },
};
</script>

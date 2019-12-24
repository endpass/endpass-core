<template>
  <field-atom>
    <label-atom
      v-if="label"
      :label="label"
    />
    <description-atom
      v-if="description"
      v-bind="$attrs"
      :description="description"
    />
    <input-atom
      :value="value"
      :is-error="isError"
      v-bind="$attrs"
      v-on="listeners"
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

export default {
  name: 'VInput',

  inheritAttrs: false,

  props: {
    label: {
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
  },

  data() {
    return {
      isFocus: false,
    };
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: e => {
          this.$emit('input', e.target.value);
        },
      };
    },

    isError() {
      return !!this.error;
    },
  },

  components: {
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

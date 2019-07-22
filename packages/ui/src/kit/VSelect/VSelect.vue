<template>
  <field-atom class="v-select">
    <label-atom
      v-if="label"
      v-bind="$attrs"
      :label="label"
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
      v-bind="$attrs"
      v-on="listeners"
    >
      <icon-atom
        v-if="isError"
        :is-error="isError"
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
import LabelAtom from '@/atom/label-atom/label-atom';
import IconAtom from '@/atom/icon-atom/icon-atom';
import SelectAtom from '@/atom/select-atom/select-atom';
import FieldAtom from '@/atom/field-atom/field-atom';
import ErrorAtom from '@/atom/error-atom/error-atom';
import DescriptionAtom from '@/atom/description-atom/description-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';

export default {
  name: 'VSelect',
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
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  computed: {
    listeners() {
      return Object.assign(this.$listeners, {
        input: (value) => {
          this.$emit('input', value);
        },
      });
    },
    isError() {
      return !!this.error;
    },
  },

  components: {
    IconAtom,
    LabelAtom,
    SelectAtom,
    FieldAtom,
    ErrorAtom,
    DescriptionAtom,
    SvgAtom,
  },
};
</script>

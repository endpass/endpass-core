<template>
  <field-atom>
    <label-atom
      v-if="label"
      :class="{ 'is-muted': $attrs.disabled }"
      :label="label"
    />
    <description-atom
      v-if="description"
      :class="{ 'is-muted': $attrs.disabled }"
      :description="description"
    />
    <input-atom
      :value="value"
      :class="inputAtomCssClass"
      v-bind="$attrs"
      v-on="listeners"
      @focus="isFocus = true"
      @blur="isFocus = false"
    >
      <icon-atom
        v-if="error"
        class="icon-atom-error"
      >
        !
      </icon-atom>
    </input-atom>
    <error-atom
      v-if="error"
      :error="error"
    />
  </field-atom>
</template>

<script>
import LabelAtom from '@/atom/label-atom/label-atom';
import IconAtom from '@/atom/icon-atom/icon-atom';
import InputAtom from '@/atom/input-atom/input-atom';
import FieldAtom from '@/atom/field-atom/field-atom';
import ErrorAtom from '@/atom/error-atom/error-atom';
import DescriptionAtom from '@/atom/description-atom/description-atom';

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
      return Object.assign(this.$listeners, {
        input: (value) => {
          this.$emit('input', value);
        },
      });
    },
    inputAtomCssClass() {
      return {
        'is-focus': this.isFocus,
        'is-error': this.error,
      };
    },
  },
  components: {
    IconAtom,
    LabelAtom,
    InputAtom,
    FieldAtom,
    ErrorAtom,
    DescriptionAtom,
  },
};
</script>

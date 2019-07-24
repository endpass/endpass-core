<template>
  <field-atom
    class="v-file-select-button"
    :class="themeCssClass"
  >
    <label-atom
      v-if="label"
      v-bind="$attrs"
      :label="label"
      class="v-file-select-label"
    />
    <description-atom
      v-if="description"
      v-bind="$attrs"
      class="v-file-select-button-desc"
      :description="description"
    />
    <file-select-atom
      v-bind="$attrs"
      @change="onChange"
    >
      <slot name="default" />
      {{ !isDefaultSlot ? 'Add File' : '' }}
    </file-select-atom>
  </field-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import FileSelectAtom from '@/atom/file-select-atom/file-select-atom';
import FieldAtom from '@/atom/field-atom/field-atom';
import LabelAtom from '@/atom/label-atom/label-atom';
import DescriptionAtom from '@/atom/description-atom/description-atom';

export default {
  name: 'VFileSelectButton',
  props: {
    label: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  computed: {
    isDefaultSlot() {
      return !!this.$slots.default;
    },
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.files);
    },
  },
  mixins: [ThemeMixin],
  components: {
    DescriptionAtom,
    LabelAtom,
    FieldAtom,
    FileSelectAtom,
  },
};
</script>

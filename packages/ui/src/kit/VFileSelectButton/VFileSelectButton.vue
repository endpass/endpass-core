<template>
  <field-atom
    class="v-file-select-button"
    :class="themeCssClass"
  >
    <label-molecule
      v-if="label"
      :label="label"
      :tooltip-label="tooltipLabel"
      v-bind="$attrs"
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
import DescriptionAtom from '@/atom/description-atom/description-atom';
import LabelMolecule from '@/molecule/label-molecule/label-molecule';

export default {
  name: 'VFileSelectButton',
  props: {
    label: {
      type: String,
      default: null,
    },

    tooltipLabel: {
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
    LabelMolecule,
    DescriptionAtom,
    FieldAtom,
    FileSelectAtom,
  },
};
</script>

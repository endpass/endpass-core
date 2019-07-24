<template>
  <field-atom
    class="v-file-drop-area"
    :class="themeCssClass"
  >
    <label-atom
      v-if="label"
      :label="label"
    />
    <file-select-atom
      v-bind="$attrs"
      size="area"
      skin="ghost"
      @change="onChange"
    >
      <slot name="default" />
      {{ !isDefaultSlot ? 'Add File' : '' }}
    </file-select-atom>
    <description-atom
      v-if="isDescription"
      v-bind="$attrs"
      class="v-file-drop-area-desc"
      :description="description"
    >
      <slot name="desc" />
    </description-atom>
  </field-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import FileSelectAtom from '@/atom/file-select-atom/file-select-atom';
import FieldAtom from '@/atom/field-atom/field-atom';
import DescriptionAtom from '@/atom/description-atom/description-atom';
import LabelAtom from '@/atom/label-atom/label-atom';

export default {
  name: 'VFileDropArea',
  props: {
    label: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: 'block',
    },
  },
  computed: {
    isDefaultSlot() {
      return !!this.$slots.default;
    },
    isDescription() {
      return !!this.$slots.desc || this.description;
    },
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.files);
    },
    preventDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    handleDrop(e) {
      const files = this.getTransferFiles(e);
      this.$emit('change', files);
      return this.preventDrop(e);
    },
    getTransferFiles(e) {
      let fileList = [];
      if (e.dataTransfer) {
        const { dataTransfer } = e;
        if (dataTransfer.files && dataTransfer.files.length) {
          fileList = dataTransfer.files;
        } else if (dataTransfer.items && dataTransfer.items.length) {
          // During the drag even the dataTransfer.files is null
          // but Chrome implements some drag store, which is accessible via dataTransfer.items
          fileList = dataTransfer.items;
        }
      } else if (e.target && e.target.files) {
        fileList = e.target.files;
      }
      return fileList;
    },
  },
  beforeMount() {
    window.addEventListener('dragenter', this.preventDrop, false);
    window.addEventListener('dragleave', this.preventDrop, false);
    window.addEventListener('dragover', this.preventDrop, false);
    window.addEventListener('drop', this.handleDrop, false);
  },
  beforeDestroy() {
    window.removeEventListener('dragenter', this.preventDrop, false);
    window.removeEventListener('dragleave', this.preventDrop, false);
    window.removeEventListener('dragover', this.preventDrop, false);
    window.removeEventListener('drop', this.handleDrop, false);
  },
  mixins: [ThemeMixin],
  components: {
    LabelAtom,
    DescriptionAtom,
    FieldAtom,
    FileSelectAtom,
  },
};
</script>

<template>
  <field-atom
    class="v-file-drop-area"
    :class="themeCssClass"
  >
    <button
      class="v-file-drop-area-button"
      type="button"
    >
      <label
        class="v-file-drop-area-label"
        :for="inputId"
      >
        <div>
          <slot />
        </div>
        <input
          :id="inputId"
          type="file"
          class="file-drop-area-input"
          v-bind="$attrs"
          @change="onChange"
        >
      </label>
    </button>
  </field-atom>
</template>

<script>
import IsDisabledMixin from '@/mixins/IsDisabledMixin';
import ThemeMixin from '@/mixins/ThemeMixin';
import FieldAtom from '@/atom/field-atom/field-atom';

let inputId = 1;

export default {
  name: 'VFileDropArea',
  data() {
    return {
      // eslint-disable-next-line no-plusplus
      inputId: `v-file-drop-area-idx-${inputId++}`,
    };
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
      if (this.isDisabled) {
        return this.preventDrop(e);
      }
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
  mixins: [ThemeMixin, IsDisabledMixin],
  components: {
    FieldAtom,
  },
};
</script>

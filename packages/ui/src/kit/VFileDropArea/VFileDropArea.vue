<template>
  <field-atom>
    <label-molecule
      v-if="label"
      :label="label"
      :tooltip-label="tooltipLabel"
      :disabled="disabled"
    />
    <div
      class="v-file-drop-area-content"
      :class="themeCssClass"
    >
      <file-paste-atom
        v-if="isUseClipboard"
        :disabled="disabled"
        @change="onPasteFiles"
      />
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
            :disabled="disabled"
            type="file"
            class="file-drop-area-input"
            v-bind="$attrs"
            @change="onChange"
          >
        </label>
      </button>
    </div>
  </field-atom>
</template>

<script>
import IsDisabledMixin from '@/mixins/IsDisabledMixin';
import ThemeMixin from '@/mixins/ThemeMixin';
import FieldAtom from '@/atom/field-atom/field-atom';
import LabelMolecule from '@/molecule/label-molecule/label-molecule';
import FilePasteAtom from '@/atom/file-paste-atom';

let inputId = 1;

export default {
  name: 'VFileDropArea',
  props: {
    label: {
      type: String,
      default: null,
    },

    tooltipLabel: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    isUseClipboard: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      // eslint-disable-next-line no-plusplus
      inputId: `v-file-drop-area-idx-${inputId++}`,
    };
  },
  methods: {
    onPasteFiles(files) {
      this.$emit('change', files);
    },

    onChange(e) {
      this.$emit('change', e.target.files);

      // drop value for reselect file(s)
      // eslint-disable-next-line no-param-reassign
      e.target.value = '';
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
          // but Chrome implements some drag store,
          // which is accessible via dataTransfer.items
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
    LabelMolecule,
    FilePasteAtom,
    FieldAtom,
  },

  model: {
    event: 'change',
    prop: 'file',
  },
};
</script>

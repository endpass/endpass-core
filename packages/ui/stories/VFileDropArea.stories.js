import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VFileDropArea from '@/kit/VFileDropArea';
import VButton from '@/kit/VButton';
import VDescription from '@/kit/VDescription';

const methods = {
  onChange: action('onChange'),
};

const components = {
  VFileDropArea,
  VButton,
  VDescription,
};

storiesOf('VFileDropArea/desktop', module)
  .add('enabled', () => ({
    methods,
    components,
    template: `
      <theme-provider>
        <v-file-drop-area @change="onChange"
            label="Single File"
            :disabled="false"
        >
          <p>Add File</p>
          <v-description disabled description="or drop files here"/>
        </v-file-drop-area>
      </theme-provider>
    `,
  }))
  .add('custom text', () => ({
    methods,
    components,
    template: `
      <theme-provider>
        <v-file-drop-area
          label="Multiple files"
          @change="onChange"
          accept="image/*"
        >
          <p>Custom Text</p>
          <v-description disabled description="or drop files here"/>
        </v-file-drop-area>
        <v-description disabled description="images only, multiple"/>
      </theme-provider>
    `,
  }))
  .add('tooltip', () => ({
    methods,
    components,
    template: `
      <theme-provider>
        <div style="padding-top: 40px">
          <v-file-drop-area
            label="Multiple files"
            tooltip-label="some text in tooltip"
            @change="onChange"
            accept="image/*"
          >
            <p>Custom Text</p>
            <v-description disabled description="or drop files here"/>
          </v-file-drop-area>
          <v-description disabled description="images only, multiple"/>
        </div>
      </theme-provider>
    `,
  }))
  .add('disable', () => ({
    methods,
    components,
    template: `
      <theme-provider>
        <v-file-drop-area
          label="Disabled state"
          @change="onChange"
          accept="image/*"
          disabled
        >
          <p>Custom Text</p>
          <v-description disabled description="or drop files here"/>
        </v-file-drop-area>
      </theme-provider>
    `,
  }))
  .add('only for jpeg', () => ({
    methods,
    components,
    template: `
      <theme-provider>
        <v-file-drop-area
          label="Only .jpeg files"
          accept=".jpeg"
          @change="onChange"
        >
          <p>Custom Text</p>
          <v-description disabled description="or drop files here"/>
        </v-file-drop-area>
      </theme-provider>
    `,
  }))
  .add('v-model', () => ({
    methods,
    data: () => ({
      file: null,
    }),
    watch: {
      file(val) {
        this.onChange(val);
      },
    },
    components,
    template: `
      <theme-provider>
        <v-file-drop-area
          v-model="file"
          label="Only .jpeg files"
          accept=".jpeg"
        >
          <p>Custom Text</p>
          <v-description disabled description="or drop files here"/>
        </v-file-drop-area>
      </theme-provider>
    `,
  }))
  .add('paste file', () => ({
    methods,
    data: () => ({
      file: null,
      imageContent: '',
    }),
    watch: {
      file(val) {
        this.onChange(val);

        if (!(val && val[0])) {
          return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', e => {
          this.imageContent = e.target.result;
        });

        reader.readAsDataURL(val[0]);
      },
    },
    components,
    template: `
      <theme-provider>
        <v-file-drop-area
          v-model="file"
          label="Only image files"
          accept="image/*"
        >
          <p>Custom Text</p>
          <v-description disabled description="or drop files here"/>
        </v-file-drop-area>
        <img
          :src="imageContent"
          style="max-width: 500px; max-height: 500px;"
        />
      </theme-provider>
    `,
  }));

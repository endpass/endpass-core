import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VFileDropArea from '@/kit/VFileDropArea';
import VButton from '@/kit/VButton';
import VLabel from '@/kit/VLabel';
import VDescription from '@/kit/VDescription';

const methods = {
  onChange: action('onChange'),
};

const components = {
  VFileDropArea,
  VButton,
  VLabel,
  VDescription,
};

storiesOf('VFileDropArea/desktop', module)
  .add('enabled', () => ({
    methods,
    components,
    template: `
      <theme-provider>
        <v-label label="Single File"/>
        <v-file-drop-area @change="onChange">
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
      <v-label label="Multiple files"/>
        <v-file-drop-area 
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
  .add('disable', () => ({
    methods,
    components,
    template: `
      <theme-provider>
      <v-label label="Disabled state"/>
        <v-file-drop-area 
          @change="onChange"
          accept="image/*"
          disabled
        >
          <p>Custom Text</p>
          <v-description disabled description="or drop files here"/>
        </v-file-drop-area>      
      </theme-provider>
    `,
  }));

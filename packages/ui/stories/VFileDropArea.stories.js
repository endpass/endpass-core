import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VFileDropArea from '@/kit/VFileDropArea';

const methods = {
  onChange: action('onChange'),
};

storiesOf('VFileDropArea/desktop', module)
  .add('enabled', () => ({
    methods,
    components: { VFileDropArea },
    template: `
      <theme-provider>
        <v-file-drop-area 
          @change="onChange" 
          label="Single file"
          description="first description"
        >
          <span slot="desc">
            with any file type
          </span>
        </v-file-drop-area>
      </theme-provider>
    `,
  }))
  .add('custom text', () => ({
    methods,
    components: { VFileDropArea },
    template: `
      <theme-provider>
        <v-file-drop-area 
          @change="onChange"
          label="Multiple files" 
          description="images only, multiple" 
          accept="image/*"
        >
          Custom text
        </v-file-drop-area>
      </theme-provider>
    `,
  }))
  .add('disable', () => ({
    methods,
    components: { VFileDropArea },
    template: `
      <theme-provider>
        <v-file-drop-area 
          @change="onChange"
          label="Disabled state" 
          description="images only" 
          accept="image/*"
          disabled
        />      
      </theme-provider>
    `,
  }));

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VFileSelectButton from '@/kit/VFileSelectButton';

const methods = {
  onChange: action('onChange'),
};

storiesOf('VFileSelectButton/desktop', module).add('states', () => ({
  methods,
  components: { VFileSelectButton },
  template: `
      <theme-provider>
        <table>
          <tr>
            <td>
              <div>
                <v-file-select-button 
                  @change="onChange" 
                  label="Single file" 
                  description="any file type"
                />      
              </div>
            </td>
            <td>
              <div>
                <v-file-select-button 
                  @change="onChange" 
                  label="Custom text" 
                  description="only .png and .jpg files" 
                  accept="image/x-png,image/jpeg"
                >
                  text
                </v-file-select-button>      
              </div>
            </td>
            <td>
              <div>
                <v-file-select-button 
                  @change="onChange"
                  label="Multiple files" 
                  description="images only, multiple" 
                  accept="image/*"
                  multiple
                >
                  this is multiple select
                </v-file-select-button>
              </div>
            </td>
            <td>
              <div>
                <v-file-select-button 
                  @change="onChange"
                  label="Disabled state" 
                  description="images only" 
                  accept="image/*"
                  disabled
                />      
              </div>
            </td>
          </tr>
        </table>
      </theme-provider>
    `,
}));

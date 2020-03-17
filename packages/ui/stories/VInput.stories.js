import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VInput from '@/kit/VInput';

const methods = {
  onInput: action('onInput'),
  onHover: action('onHover'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
};

storiesOf('VInput/desktop', module).add('default', () => ({
  methods,
  components: { VInput },
  data() {
    return {
      error: 'Error message here',
      model: null,
      label: 'Label',
      description: 'Helper text goes here',
    };
  },
  template: `
      <theme-provider>
        <table>
          <thead>
            <tr>
              <th>state</th>
              <th>view</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>default</td>
              <td>
                <v-input
                  style="width: 288px;"
                  v-model="model"
                  placeholder="Placeholder text"
                  @input="onInput"
                  :label="label"
                  :description="description"
                />
              </td>
            </tr>
            <tr><td colspan="2"><hr/></td></tr>
            <tr>
              <td>error</td>
              <td>
                <v-input
                  v-model="model"
                  :error="error"
                  style="width: 288px;"
                  tooltip-label="hello this is tooltip data"
                  placeholder="Placeholder text"
                  :label="label"
                  :description="description"
                />
              </td>
            </tr>
            <tr><td colspan="2"><hr/></td></tr>
            <tr>
              <td>disabled</td>
              <td>
                <v-input
                  v-model="model"
                  :disabled="true"
                  style="width: 288px;"
                  placeholder="Placeholder text"
                  :label="label"
                  :description="description"
                />
              </td>
            </tr>
          </tbody>
        </table>
        {{ model }}
      </theme-provider>
    `,
}));

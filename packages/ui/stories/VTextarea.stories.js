import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VTextarea from '@/kit/VTextarea';

const methods = {
  onInput: action('onInput'),
};

storiesOf('VTextarea/desktop', module).add('default', () => ({
  methods,
  components: { VTextarea },
  data() {
    return {
      model: null,
      label: 'Label',
      error: 'Error message here',
      description: 'Helper text goes here',
    };
  },
  template: `
      <theme-provider>
        <table style="padding-top: 40px;">
          <thead>
            <tr>
              <th>Enable</th>
              <th>Tooltip</th>
              <th>Error</th>
              <th>Disabled</th>
              <th>Skin White</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <v-textarea
                  style="width: 288px; height: 80px;"
                  v-model="model"
                  placeholder="Placeholder text"
                  @input="onInput"
                  :label="label"
                  :description="description"
                />
              </td>
              <td>
                <v-textarea
                  style="width: 288px; height: 80px;"
                  v-model="model"
                  placeholder="Placeholder text"
                  @input="onInput"
                  :label="label"
                  tooltip-label="some text in tooltip"
                  :description="description"
                />
              </td>
              <td>
                <v-textarea
                  v-model="model"
                  :error="error"
                  style="width: 288px; height: 80px;"
                  placeholder="Placeholder text"
                  :label="label"
                  :description="description"
                />
              </td>
              <td>
                <v-textarea
                  v-model="model"
                  :disabled="true"
                  style="width: 288px; height: 80px;"
                  placeholder="Placeholder text"
                  :label="label"
                  :description="description"
                />
              </td>
              <td>
                <v-textarea
                  style="width: 288px; height: 80px;"
                  v-model="model"
                  placeholder="Placeholder text"
                  @input="onInput"
                  skin="white"
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

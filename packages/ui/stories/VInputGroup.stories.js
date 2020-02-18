import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VInputGroup from '@/kit/VInputGroup';
import VSelect from '@/kit/VSelect';
import VInput from '@/kit/VInput';

const methods = {
  onInput: action('onInput'),
  onHover: action('onHover'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
};

storiesOf('VInputGroup/desktop', module).add('default', () => ({
  methods,
  components: { VInputGroup, VInput, VSelect },
  data() {
    return {
      error: 'Error message here',
      models: {
        input: null,
        select: 'value',
      },
      options: [
        {
          val: 'value',
          text: 'text option 1 with a long long long long long long long text',
        },
        { val: 'next value', text: 'next option' },
      ],
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
                <v-input-group :label="label">
                  <v-select
                    v-model="models.select"
                    placeholder="Placeholder text"
                    @input="onInput"
                    :options="options"
                    :description="description"
                  />
                  <v-input
                    style="width: 288px;"
                    v-model="models.input"
                    placeholder="Placeholder text"
                    @input="onInput"
                    :description="description"
                  />
                </v-input-group>
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
}));

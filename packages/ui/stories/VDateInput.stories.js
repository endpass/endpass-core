import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VDateInput from '@/kit/VDateInput';

const methods = {
  onChange: action('onChange'),
};

storiesOf('VDateInput/desktop', module)
  .add('default', () => ({
    data: () => ({
      model: new Date(),
    }),
    methods,
    components: { VDateInput },
    template: `
      <theme-provider>
              <table>
          <thead>
            <tr>
              <th>State</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>default</td>
              <td>
                <v-date-input v-model="model" @change="onChange" />
              </td>
            </tr>
            <tr><td colspan="2"><hr/></td></tr>
            <tr>
              <td>error</td>
              <td>
                <v-date-input v-model="model" placeholder="Select the date..." label="Input label" error="Error" @change="onChange" />
              </td>
            </tr>
            <tr><td colspan="2"><hr/></td></tr>
            <tr>
              <td>tooltip</td>
              <td>
                <v-date-input
                  v-model="model"
                  @change="onChange"
                  label="label of date"
                  tooltip-label="some text in tooltip"
                />
              </td>
            </tr>
            <tr><td colspan="2"><hr/></td></tr>
            <tr>
              <td>disabled</td>
              <td>
                <v-date-input v-model="model" label="Label here" :disabled="true" @change="onChange" />
              </td>
            </tr>
            <tr><td colspan="2"><hr/></td></tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('empty initial state', () => ({
    data: () => ({
      model: null,
    }),
    methods,
    components: { VDateInput },
    template: `
      <theme-provider>
        <v-date-input v-model="model" placeholder="Select the date..." @change="onChange" />
      </theme-provider>
    `,
  }))
  .add('min/max dates', () => ({
    data: () => ({
      left: '2001-01-01',
      right: '2001-06-01',
    }),
    methods,
    components: { VDateInput },
    template: `
      <theme-provider>
        <table>
          <tr>
            <td>
              <v-date-input v-model="left" :min-date="left" placeholder="Select the date..." @change="onChange" />
            </td>
            <td>
                <v-date-input v-model="right" :max-date="right" placeholder="Select the date..." @change="onChange" />
            </td>
          </tr>
        </table>
      </theme-provider>
    `,
  }));

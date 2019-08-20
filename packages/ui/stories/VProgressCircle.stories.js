import { storiesOf } from '@storybook/vue';
import VProgressCircle from '@/kit/VProgressCircle';

storiesOf('VProgressCircle/desktop', module)
  .add('default', () => ({
    components: { VProgressCircle },
    template: `
      <theme-provider>
        <table class="storybook-table">
          <tr>
            <td>
              <v-progress-circle progress="50"/>
            </td>
            <td>
              <v-progress-circle progress="75"/>
            </td>
            <td>
              <v-progress-circle progress="5"/>
            </td>
            <td>
              <v-progress-circle progress="95"/>
            </td>
          </tr>
        </table>
      </theme-provider>
    `,
  }))
  .add('with label', () => ({
    components: { VProgressCircle },
    template: `
      <theme-provider>
        <table class="storybook-table">
          <tr>
            <td>
              <v-progress-circle progress="50" :is-label-visible="true" />
            </td>
            <td>
              <v-progress-circle progress="75" :is-label-visible="true" />
            </td>
            <td>
              <v-progress-circle progress="5" :is-label-visible="true" />
            </td>
            <td>
              <v-progress-circle progress="95" :is-label-visible="true" />
            </td>
          </tr>
        </table>
      </theme-provider>
    `,
  }));

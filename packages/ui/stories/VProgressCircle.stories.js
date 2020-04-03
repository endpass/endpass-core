import { storiesOf } from '@storybook/vue';
import VProgressCircle from '@/kit/VProgressCircle';

storiesOf('VProgressCircle/desktop', module)
  .add('normal', () => ({
    components: { VProgressCircle },
    template: `
      <theme-provider>
        <table class="storybook-table">
          <thead>
            <tr>
              <td colspan="6">normal size</td>
            </tr>
            <tr>
              <th>0</th>
              <th>50</th>
              <th>75</th>
              <th>5</th>
              <th>95</th>
              <th>100</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <v-progress-circle progress="0" size="normal" />
              </td>
              <td>
                <v-progress-circle progress="50" size="normal" />
              </td>
              <td>
                <v-progress-circle progress="75" size="normal" />
              </td>
              <td>
                <v-progress-circle progress="5" size="normal" />
              </td>
              <td>
                <v-progress-circle progress="95" size="normal" />
              </td>
              <td>
                <v-progress-circle progress="100" size="normal" />
              </td>
            </tr>
            <tr>
              <td>
                <v-progress-circle progress="0" size="normal" :is-label-visible="true" />
              </td>
              <td>
                <v-progress-circle progress="50" size="normal" :is-label-visible="true" />
              </td>
              <td>
                <v-progress-circle progress="75" size="normal" :is-label-visible="true" />
              </td>
              <td>
                <v-progress-circle progress="5" size="normal" :is-label-visible="true" />
              </td>
              <td>
                <v-progress-circle progress="95" size="normal" :is-label-visible="true" />
              </td>
              <td>
                <v-progress-circle progress="100" size="normal" :is-label-visible="true" />
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('inline', () => ({
    components: { VProgressCircle },
    template: `
      <theme-provider>
        <table class="storybook-table">
          <thead>
            <tr>
              <td colspan="6">inline size</td>
            </tr>
            <tr>
              <th>0</th>
              <th>50</th>
              <th>75</th>
              <th>5</th>
              <th>95</th>
              <th>100</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <v-progress-circle progress="0" size="inline" />
              </td>
              <td>
                <v-progress-circle progress="50" size="inline" />
              </td>
              <td>
                <v-progress-circle progress="75" size="inline" />
              </td>
              <td>
                <v-progress-circle progress="5" size="inline" />
              </td>
              <td>
                <v-progress-circle progress="95" size="inline" />
              </td>
              <td>
                <v-progress-circle progress="100" size="inline" />
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }));

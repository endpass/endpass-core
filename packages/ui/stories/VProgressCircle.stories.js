import { storiesOf } from '@storybook/vue';
import VProgressCircle from '@/kit/VProgressCircle';

storiesOf('VProgressCircle/desktop', module).add('default', () => ({
  components: { VProgressCircle },
  template: `
      <theme-provider>
        <table class="storybook-table">
          <thead>
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
                <v-progress-circle progress="0"/>
              </td>
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
              <td>
                <v-progress-circle progress="100"/>
              </td>
            </tr>
            <tr>
              <td>
                <v-progress-circle progress="0" :is-label-visible="true" />
              </td>
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
              <td>
                <v-progress-circle progress="100" :is-label-visible="true" />
              </td>
            </tr>
            <tr>
              <td>
                <v-progress-circle progress="0" lineThickness="1"/>
              </td>
              <td>
                <v-progress-circle progress="50" lineThickness="1"/>
              </td>
              <td>
                <v-progress-circle progress="75" lineThickness="1"/>
              </td>
              <td>
                <v-progress-circle progress="5" lineThickness="6"/>
              </td>
              <td>
                <v-progress-circle progress="95" lineThickness="6"/>
              </td>
              <td>
                <v-progress-circle progress="100" lineThickness="6"/>
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
}));

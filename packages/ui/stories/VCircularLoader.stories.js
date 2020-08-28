import { storiesOf } from '@storybook/vue';
import VCircularLoader from '@/kit/VCircularLoader';

storiesOf('VCircularLoader/desktop', module).add('default', () => ({
  components: { VCircularLoader },
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
                <v-circular-loader progress="0" :size="41" :is-animated="false"  :end-angle="180"/>
              </td>
              <td>
                <v-circular-loader progress="50" :size="41" :is-animated="false" :start-angle="-120" :end-angle="120"/>
              </td>
              <td>
                <v-circular-loader progress="75" :size="41"  :is-animated="false" :end-angle="180"/>
              </td>
              <td>
                <v-circular-loader progress="5" :size="41"  :is-animated="false" :end-angle="180"/>
              </td>
              <td>
                <v-circular-loader progress="95" :size="41"  :is-animated="false" :end-angle="180"/>
              </td>
              <td>
                <v-circular-loader progress="100" :size="41"  :is-animated="false" :end-angle="180"/>
              </td>
            </tr>
            <tr>
              <td>
                <v-circular-loader progress="0" :is-animated="false" />
              </td>
              <td>
                <v-circular-loader progress="50" :is-animated="false" />
              </td>
              <td>
                <v-circular-loader progress="75" :is-animated="false"  />
              </td>
              <td>
                <v-circular-loader progress="5" :is-animated="false"  />
              </td>
              <td>
                <v-circular-loader progress="95" :is-animated="false"  />
              </td>
              <td>
                <v-circular-loader progress="100" :is-animated="false"  />
              </td>
            </tr>
            <tr>
              <td>
                <v-circular-loader progress="0" :size="128"  lineThickness="1" :is-animated="false" />
              </td>
              <td>
                <v-circular-loader progress="50" :size="128"   lineThickness="1" :is-animated="false" />
              </td>
              <td>
                <v-circular-loader progress="75" :size="128"   lineThickness="1" :is-animated="false" />
              </td>
              <td>
                <v-circular-loader progress="5" :size="128"   lineThickness="6" :is-animated="false" />
              </td>
              <td>
                <v-circular-loader progress="95" :size="128"   lineThickness="6" :is-animated="false" />
              </td>
              <td>
                <v-circular-loader progress="100" :size="128"   lineThickness="6" :is-animated="false" />
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
}));

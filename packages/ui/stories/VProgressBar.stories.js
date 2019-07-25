import { storiesOf } from '@storybook/vue';
import VProgressCircle from '@/kit/VProgressCircle';

storiesOf('VProgressCircle/desktop', module).add('default', () => ({
  components: { VProgressCircle },
  template: `
      <theme-provider>
        <table class="storybook-table">
          <tr>
            <td>
              <v-progress-circle progress="50"/>
              <span>50%</span>
            </td>
            <td>
              <v-progress-circle progress="75"/>
              <span>75%</span>
            </td>            
            <td>
              <v-progress-circle progress="5"/>
              <span>5%</span>
            </td>
            <td>
              <v-progress-circle progress="95"/>
              <span>95%</span>
            </td>
          </tr>          
        </table>      
      </theme-provider>
    `,
}));

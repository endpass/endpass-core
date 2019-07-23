import { storiesOf } from '@storybook/vue';
import VIndicator from '@/kit/VIndicator';

storiesOf('VIndicator/desktop', module).add('default', () => ({
  components: { VIndicator },
  template: `
      <theme-provider>        
        <table class="storybook-table">
          <tr>
            <td>
              <div>
                <v-indicator/>
              </div>
              <span>ok status</span>
            </td>
            <td>
              <div>
                <v-indicator status="error"/>
              </div>
              <span>error status</span>
            </td>            
          </tr>          
        </table>
      </theme-provider>
  `,
}));

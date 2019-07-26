import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VTag from '@/kit/VTag';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VTag/desktop', module).add('default', () => ({
  methods,
  components: { VTag },
  template: `
      <theme-provider>
        
        <table>
          <thead>
            <tr>
              <th>
                
              </th>
              <th>
                No skin
              </th>
              <th>
                cyan
              </th>
              <th>
                red
              </th>
              <th>
                magenta
              </th>
              <th>
                purple
              </th>
              <th>
                blue
              </th>
              <th>
                teal
              </th>
              <th>
                green
              </th>
              <th>
                gray
              </th>
              <th>
                disabled
              </th>
            </tr>
          </thead>
          <tr>
            <td>default</td>
            <td>
              <v-tag >text tag</v-tag>            
            </td>
            <td>
              <v-tag skin="cyan">text tag</v-tag>            
            </td>
            <td>
              <v-tag skin="red">text tag</v-tag>            
            </td>
            <td>
              <v-tag skin="magenta">text tag</v-tag>            
            </td>
            <td>
              <v-tag skin="purple">text tag</v-tag>            
            </td>
            <td>
              <v-tag skin="blue">text tag</v-tag>            
            </td>
            <td>
              <v-tag skin="teal">text tag</v-tag>            
            </td>
            <td>
              <v-tag skin="green">text tag</v-tag>            
            </td>
            <td>
              <v-tag skin="gray">text tag</v-tag>            
            </td>
            <td>
              <v-tag disabled>text tag</v-tag>            
            </td>
          </tr>
          <tr>
            <td>is-closable</td>
            <td>
              <v-tag @click="onClick" is-closable >text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="cyan">text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="red">text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="magenta">text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="purple">text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="blue">text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="teal">text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="green">text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="gray">text tag</v-tag>            
            </td>
            <td>
              <v-tag @click="onClick" is-closable  disabled>text tag</v-tag>            
            </td>
          </tr>        </table>
      </theme-provider>
    `,
}));

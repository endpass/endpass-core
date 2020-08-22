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
                light-gray
              </th>
              <th>
                dark-gray
              </th>
              <th>
                white
              </th>
              <th>
                success
              </th>
              <th>
                error
              </th>
              <th>
                disabled
              </th>
            </tr>
          </thead>
          <tr>
            <td>default</td>
            <td>
              <v-tag >lorem</v-tag>
            </td>
            <td>
              <v-tag skin="cyan">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="red">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="magenta">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="purple">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="blue">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="teal">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="green">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="gray">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="light-gray">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="dark-gray">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="white">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="success">lorem</v-tag>
            </td>
            <td>
              <v-tag skin="error">lorem</v-tag>
            </td>
            <td>
              <v-tag disabled>lorem</v-tag>
            </td>
          </tr>
          <tr>
            <td>is-closable</td>
            <td>
              <v-tag @click="onClick" is-closable >lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="cyan">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="red">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="magenta">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="purple">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="blue">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="teal">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="green">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="gray">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="light-gray">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="dark-gray">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="white">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="success">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  skin="error">lorem</v-tag>
            </td>
            <td>
              <v-tag @click="onClick" is-closable  disabled>lorem</v-tag>
            </td>
          </tr>        </table>
      </theme-provider>
    `,
}));

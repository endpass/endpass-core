import { storiesOf } from '@storybook/vue';
import VLabel from '@/kit/VLabel';

storiesOf('VLabel/desktop', module).add('default', () => ({
  components: { VLabel },
  template: `
      <theme-provider>
        <table style="padding-top: 40px;">
          <thead>
            <tr>
              <th>State</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>No tooltip</td>
            <td>
              <v-label label="Label text" />
              Following content
            </td>
          </tr>
          <tr><td colspan="2"><hr/></td></tr>
          <tr>
            <td>With tooltip</td>
            <td>
              <v-label
                label="Label text"
                tooltip-label="tooltip some text here"
              />
              Following content
            </td>
          </tr>
          <tr><td colspan="2"><hr/></td></tr>
          <tr>
            <td>disabled</td>
            <td>
              <v-label
                label="Disabled label"
                tooltip-label="tooltip some text here"
                disabled
              />
              Following content
            </td>
          </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
}));

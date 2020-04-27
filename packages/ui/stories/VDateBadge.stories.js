import { storiesOf } from '@storybook/vue';
import VDateBadge from '@/kit/VDateBadge';

storiesOf('VDateBadge/desktop', module).add('default', () => ({
  data: () => ({
    date: new Date('Sun Oct 10 2010 04:00:00 GMT+0400'),
  }),
  components: { VDateBadge },
  template: `
    <theme-provider>
      <table width="100%">
        <tbody>
          <tr>
            <th scope="row">Primary</th>
            <td><v-date-badge :date="date" skin="primary" /></td>
          </tr>
          <tr>
            <th scope="row">Secondary</th>
            <td><v-date-badge :date="date" skin="secondary" /></td>
          </tr>
        </tbody>
      </table>
    </theme-provider>
  `,
}));

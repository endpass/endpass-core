import { storiesOf } from '@storybook/vue';
import VDateBadge from '@/kit/VDateBadge';

storiesOf('VDateBadge/desktop', module).add('default', () => ({
  data: () => ({
    date: new Date('Sun Oct 10 2010 04:00:00 GMT+0400'),
  }),
  components: { VDateBadge },
  template: `
      <theme-provider>
        <v-date-badge :date="date" />
      </theme-provider>
    `,
}));

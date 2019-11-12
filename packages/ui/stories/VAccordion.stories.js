import { storiesOf } from '@storybook/vue';
import VAccordion from '@/kit/VAccordion';

storiesOf('VAccordion/desktop', module)
  .add('default', () => ({
    components: { VAccordion },
    template: `
      <theme-provider>
        <v-accordion />
      </theme-provider>
    `,
  }));
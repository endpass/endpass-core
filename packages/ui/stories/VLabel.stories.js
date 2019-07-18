import { storiesOf } from '@storybook/vue';
import VLabel from '@/kit/VLabel';

storiesOf('VLabel/desktop', module)
  .add('default', () => ({
    components: { VLabel },
    template: `
      <theme-provider>
        <v-label label="Label text" />
        Following content
      </theme-provider>
    `,
  }))
  .add('error', () => ({
    components: { VLabel },
    template: `
      <theme-provider>
        <v-label :is-error="true" label="Label text" />
        Following content
      </theme-provider>
    `,
  }));

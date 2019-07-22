import { storiesOf } from '@storybook/vue';
import VLogo from '@/kit/VLogo';

storiesOf('VLogo/desktop', module).add('default', () => ({
  components: { VLogo },
  template: `
      <theme-provider>
        <v-logo :is-white="false" />
      </theme-provider>
    `,
}));

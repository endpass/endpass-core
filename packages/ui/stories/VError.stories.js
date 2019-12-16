import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VError from '@/kit/VError';

storiesOf('VError/desktop', module).add('default', () => ({
  components: { VError },
  template: `
      <theme-provider>
        <v-error
          error="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
        />
      </theme-provider>
    `,
}));

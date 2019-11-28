import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VAlert from '@/kit/VAlert';

const methods = {
  onClose: action('onClose'),
};

storiesOf('VAlert/desktop', module).add('default', () => ({
  methods,
  components: { VAlert },
  template: `
      <theme-provider>
        <v-alert @close="onClose">
          Alert content
        </v-alert>
      </theme-provider>
    `,
}));

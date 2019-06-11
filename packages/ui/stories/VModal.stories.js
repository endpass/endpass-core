import { storiesOf } from '@storybook/vue'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line
import VModal from '@/kit/VModal/VModal';

const methods = {
  onReturn: action('onReturn'),
  onClose: action('onClose'),
};

storiesOf('VModal/desktop', module).add('enabled', () => ({
  methods,
  components: { VModal },
  data() {
    return {
      title: 'Modal title',
      body: 'Modal body',
      footer: 'Modal footer',
    };
  },
  template: `
      <theme-provider>
        <v-modal
        :is-returnable="true"
        @close="onClose"
        @return="onReturn"
        >
          <template slot="title">{{ title }}</template>
          {{ body }}
          <template slot="footer">{{ footer }}</template>
        </v-modal>
      </theme-provider>
    `,
}));

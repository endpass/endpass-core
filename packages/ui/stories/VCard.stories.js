import { storiesOf } from '@storybook/vue';
import VCard, { VCardBody } from '@/kit/VCard';

storiesOf('VCard/desktop', module)
  .add('default', () => ({
    components: { VCard, VCardBody },
    data() {
      return {
        value: false,
      };
    },
    template: `
      <theme-provider>
        <v-card>
          <v-card-body>
            Card body
          </v-card-body>
        </v-card>
      </theme-provider>
    `,
  }));

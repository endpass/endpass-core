import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VModal from '@/kit/VModal';
import VModalCard from '@/kit/VModal/VModalCard';

const methods = {
  onReturn: action('onReturn'),
  onClose: action('onClose'),
  onMaskClick: action('onMaskClick'),
};

storiesOf('VModal/VModalCard', module)
  .add('default', () => ({
    methods,
    components: { VModal, VModalCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
      };
    },
    template: `
      <theme-provider>
        <v-modal @click="onMaskClick">
          <v-modal-card>
            <template slot="title">{{ title }}</template>
            {{ body }}
          </v-modal-card>
        </v-modal>
      </theme-provider>
    `,
  }))
  .add('closable', () => ({
    methods,
    components: { VModal, VModalCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
      };
    },
    template: `
      <theme-provider>
        <v-modal @click="onMaskClick">
          <v-modal-card
            :is-closable="true"
            @close="onClose"
          >
            <template slot="title">{{ title }}</template>
            {{ body }}
          </v-modal-card>
        </v-modal>
      </theme-provider>
    `,
  }))
  .add('returnable', () => ({
    methods,
    components: { VModal, VModalCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
      };
    },
    template: `
      <theme-provider>
        <v-modal @click="onMaskClick">
          <v-modal-card
            :is-returnable="true"
            @return="onReturn"
          >
            <template slot="title">{{ title }}</template>
            {{ body }}
          </v-modal-card>
        </v-modal>
      </theme-provider>
    `,
  }))
  .add('both', () => ({
    methods,
    components: { VModal, VModalCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
      };
    },
    template: `
      <theme-provider>
        <v-modal @click="onMaskClick">
          <v-modal-card
            :is-closable="true"
            @close="onClose"
            :is-returnable="true"
            @return="onReturn"
          >
            <template slot="title">{{ title }}</template>
            {{ body }}
          </v-modal-card>
        </v-modal>
      </theme-provider>
    `,
  }));

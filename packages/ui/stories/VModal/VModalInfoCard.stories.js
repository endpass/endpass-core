import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VModal from '@/kit/VModal';
import VModalInfoCard from '@/kit/VModal/VModalInfoCard';

const methods = {
  onReturn: action('onReturn'),
  onClose: action('onClose'),
  onMaskClick: action('onMaskClick'),
};

storiesOf('VModal/VModalInfoCard', module)
  .add('default', () => ({
    methods,
    components: { VModal, VModalInfoCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
        info: 'Some additional information about Endpass',
      };
    },
    template: `
      <theme-provider>
        <v-modal @click="onMaskClick">
          <v-modal-info-card>
            <template slot="info">{{ info }}</template>
            <template slot="title">{{ title }}</template>
            {{ body }}
          </v-modal-info-card>
        </v-modal>
      </theme-provider>
    `,
  }))
  .add('closable', () => ({
    methods,
    components: { VModal, VModalInfoCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
        info: 'Some additional information about Endpass',
      };
    },
    template: `
      <theme-provider>
        <v-modal @click="onMaskClick">
          <v-modal-info-card
            :is-closable="true"
            @close="onClose"
          >
            <template slot="info">{{ info }}</template>
            <template slot="title">{{ title }}</template>
            {{ body }}
          </v-modal-info-card>
        </v-modal>
      </theme-provider>
    `,
  }))
  .add('returnable', () => ({
    methods,
    components: { VModal, VModalInfoCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
        info: 'Some additional information about Endpass',
      };
    },
    template: `
      <theme-provider>
        <v-modal @click="onMaskClick">
          <v-modal-info-card
            :is-returnable="true"
            @return="onReturn"
          >
            <template slot="info">{{ info }}</template>
            <template slot="title">{{ title }}</template>
            {{ body }}
          </v-modal-info-card>
        </v-modal>
      </theme-provider>
    `,
  }))
  .add('both', () => ({
    methods,
    components: { VModal, VModalInfoCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
        info: 'Some additional information about Endpass',
      };
    },
    template: `
      <theme-provider>
        <v-modal @click="onMaskClick">
          <v-modal-info-card
            :is-closable="true"
            @close="onClose"
            :is-returnable="true"
            @return="onReturn"
          >
            <template slot="info">{{ info }}</template>
            <template slot="title">{{ title }}</template>
            {{ body }}
          </v-modal-info-card>
        </v-modal>
      </theme-provider>
    `,
  }));

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
  }))
  .add('description', () => ({
    methods,
    components: { VModal, VModalCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
        description: 'some description text',
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
              <template slot="description">{{ description }}</template>
              <template slot="title">{{ title }}</template>
              {{ body }}
            </v-modal-card>
          </v-modal>
        </theme-provider>
      `,
  }))
  .add('esc press', () => ({
    methods,
    components: { VModal, VModalCard },
    data() {
      return {
        title: 'Click to file select, then ESC',
        body: 'click to file select and then press ESC button',
        description: 'click to file select and then press ESC button',
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
            <template slot="description">{{ description }}</template>
            <template slot="title">{{ title }}</template>
            <input type="file">
          </v-modal-card>
        </v-modal>
      </theme-provider>
    `,
  }))
  .add('icon', () => ({
    methods,
    components: { VModal, VModalCard },
    data() {
      return {
        title: 'Modal title',
        body: 'Modal body',
        icon: 'icon',
        description: 'some description text',
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
                <template slot="icon">{{ icon }}</template>
                <template slot="title">{{ title }}</template>
                <template slot="description">{{ description }}</template>
                {{ body }}
              </v-modal-card>
            </v-modal>
          </theme-provider>
        `,
  }));

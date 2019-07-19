import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VSuperMenuControl from '@/kit/VSuperMenuControl';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VSuperMenuControl/desktop', module)
  .add('default', () => ({
    components: { VSuperMenuControl },
    template: `
      <theme-provider>
        <v-super-menu-control icon="admin">
          Super sidebar control
        </v-super-menu-control>
      </theme-provider>
    `,
  }))
  .add('active', () => ({
    components: { VSuperMenuControl },
    template: `
      <theme-provider>
        <v-super-menu-control icon="admin" :is-active="true">
          Active super sidebar control
        </v-super-menu-control>
      </theme-provider>
    `,
  }))
  .add('as button', () => ({
    methods,
    components: { VSuperMenuControl },
    template: `
      <theme-provider>
        <v-super-menu-control icon="admin" @click="onClick">
          Active super sidebar control
        </v-super-menu-control>
      </theme-provider>
    `,
  }));

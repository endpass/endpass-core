import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VNavControl from '@/kit/VNavControl';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VNavControl/desktop', module)
  .add('default', () => ({
    components: { VNavControl },
    template: `
      <theme-provider>
        <v-nav-control href="#">Link</v-nav-control>
      </theme-provider>
    `,
  }))
  .add('active', () => ({
    components: { VNavControl },
    template: `
      <theme-provider>
        <v-nav-control :is-active="true" href="#">Active link</v-nav-control>
      </theme-provider>
    `,
  }))
  .add('as button', () => ({
    methods,
    components: { VNavControl },
    template: `
      <theme-provider>
        <v-nav-control @click="onClick">Nav button</v-nav-control>
      </theme-provider>
    `,
  }));

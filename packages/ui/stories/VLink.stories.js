import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VLink from '@/kit/VLink';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VLink/desktop', module)
  .add('default', () => ({
    methods,
    components: { VLink },
    template: `
      <theme-provider class="theme-default">
        <div>open in new tab <v-link @click="onClick" href="http://google.com" target="_blank">http://google.com</v-link></div>
        <div><v-link @click="onClick">just link</v-link></div>
        <div><v-link @click="onClick" is-underline>with underline</v-link></div>
        <div><v-link @click="onClick" disabled>disabled</v-link></div>
      </theme-provider>
    `,
  }));

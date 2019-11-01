import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VCodeInput from '@/kit/VCodeInput';

const methods = {
  onInput: action('onInput'),
};

storiesOf('VCodeInput/desktop', module)
  .add('default', () => ({
    methods,
    components: { VCodeInput },
    template: `
      <theme-provider>
        <v-code-input @input="onInput" />
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    methods,
    components: { VCodeInput },
    template: `
      <theme-provider>
        <v-code-input disabled @input="onInput" />
      </theme-provider>
    `,
  }))
  .add('v-model', () => ({
    methods,
    data: () => ({
      code: '123123',
    }),
    components: { VCodeInput },
    template: `
      <theme-provider>
        <p>Current code: <input v-model="code" /></p>
        <v-code-input v-model="code" />
      </theme-provider>
    `,
  }));

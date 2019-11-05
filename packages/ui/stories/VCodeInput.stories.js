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
  .add('custom length', () => ({
    methods,
    components: { VCodeInput },
    template: `
  <theme-provider>
    <v-code-input :length="8" :interval="2" @input="onInput" />
  </theme-provider>
`,
  }))
  .add('splitting interval', () => ({
    methods,
    components: { VCodeInput },
    template: `
      <theme-provider>
       <p>
         <p>Each 1</p>
         <v-code-input :interval="1" :length="10" @input="onInput" />
       </p>
       <p>
         <p>Each 2</p>
         <v-code-input :interval="2" :length="10" @input="onInput" />
       </p>
       <p>
         <p>Each 3</p>
         <v-code-input :interval="3" :length="10" @input="onInput" />
       </p>
       <p>
         <p>Each 5</p>
         <v-code-input :interval="5" :length="10" @input="onInput" />
       </p>
       <p>
         <p>Each 10</p>
         <v-code-input :interval="10" :length="10" @input="onInput" />
       </p>
     </p>
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

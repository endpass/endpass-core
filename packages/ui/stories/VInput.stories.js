import { storiesOf } from '@storybook/vue'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line
import VInput from '@/components/VInput/VInput.vue';

const methods = {
  onInput: action('onInput'),
  onHover: action('onHover'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
};

storiesOf('VInput/desktop', module)
  .add('enabled', () => ({
    methods,
    components: { VInput },
    data() {
      return {
        model: null,
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    template: `
      <theme-provider>
        <v-input
          style="width: 288px;"
          v-model="model"
          placeholder="Placeholder text"
          @input="onInput"
          :label="label"
          :description="description"
        />
      </theme-provider>
    `,
  }))
  .add('error', () => ({
    data() {
      return {
        error: 'Error message here',
        model: 'User input text',
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    methods,
    components: { VInput },
    template: `
      <theme-provider>
        <v-input
          v-model="model"
          :error="error"
          style="width: 288px;"
          placeholder="Placeholder text"
          :label="label"
          :description="description"
        />
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    methods,
    components: { VInput },
    data() {
      return {
        model: null,
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    template: `
      <theme-provider>
        <v-input
          v-model="model"
          disabled="true"
          style="width: 288px;"
          placeholder="Placeholder text"
          :label="label"
          :description="description"
        />
      </theme-provider>
    `,
  }));

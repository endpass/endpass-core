import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VTextarea from '@/kit/VTextarea';

const methods = {
  onInput: action('onInput'),
};

storiesOf('VTextarea/desktop', module)
  .add('enabled', () => ({
    methods,
    components: { VTextarea },
    data() {
      return {
        model: null,
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    template: `
      <theme-provider>
        <v-textarea
          style="width: 288px; height: 80px;"
          v-model="model"
          placeholder="Placeholder text"
          @input="onInput"
          :label="label"
          :description="description"
        />
        {{ model }}
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
    components: { VTextarea },
    template: `
      <theme-provider>
        <v-textarea
          v-model="model"
          :error="error"
          style="width: 288px; height: 80px;"
          placeholder="Placeholder text"
          :label="label"
          :description="description"
        />
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    methods,
    components: { VTextarea },
    data() {
      return {
        model: null,
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    template: `
      <theme-provider>
        <v-textarea
          v-model="model"
          disabled="true"
          style="width: 288px; height: 80px;"
          placeholder="Placeholder text"
          :label="label"
          :description="description"
        />
      </theme-provider>
    `,
  }))
  .add('skin white', () => ({
    methods,
    components: { VTextarea },
    data() {
      return {
        model: null,
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    template: `
      <theme-provider>
        <v-textarea
          style="width: 288px; height: 80px;"
          v-model="model"
          placeholder="Placeholder text"
          @input="onInput"
          skin="white"
          :label="label"
          :description="description"
        />
        {{ model }}
      </theme-provider>
    `,
  }));

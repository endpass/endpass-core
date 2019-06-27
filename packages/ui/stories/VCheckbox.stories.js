import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VCheckbox from '@/kit/VCheckbox';

const methods = {
  onInput: action('onInput'),
};

storiesOf('VCheckbox/desktop', module)
  .add('default state false', () => ({
    methods,
    components: { VCheckbox },
    data() {
      return {
        value: false,
      };
    },
    template: `
      <theme-provider>
        <v-checkbox
          v-model="value"
          @change="onInput"
        >
          state: {{ value }}
        </v-checkbox>
      </theme-provider>
    `,
  }))

  .add('default state true', () => ({
    methods,
    components: { VCheckbox },
    data() {
      return {
        value: true,
      };
    },
    template: `
      <theme-provider>
        <v-checkbox
          v-model="value"
          @change="onInput"
        >
          state: {{ value }}
        </v-checkbox>
      </theme-provider>
    `,
  }))

  .add('default state', () => ({
    methods,
    components: { VCheckbox },
    data() {
      return {
        model: false,
      };
    },
    template: `
      <theme-provider>
        <v-checkbox
          v-model="model"
          name="Name"
          @change="onInput"
        >
          state: {{ model }}
        </v-checkbox>
      </theme-provider>
    `,
  }))
  .add('array', () => ({
    methods,
    components: { VCheckbox },
    data() {
      return {
        model: ['Bob', 'Alice'],
      };
    },
    template: `
      <theme-provider>
        <v-checkbox
          v-model="model"
          value="Crypto!"
          name="Name"
        >
          with Crypto!
        </v-checkbox>
        <br/>
        persons: {{ model.join(', ') }}
      </theme-provider>
    `,
  }))
  .add('true/false attr', () => ({
    methods,
    components: { VCheckbox },
    data() {
      return {
        model: 'no',
      };
    },
    template: `
      <theme-provider>
        <v-checkbox
          v-model="model"
          name="Name"
          true-value="yes"
          false-value="no"
          @input="onInput"
        >
          state: {{ model }}
        </v-checkbox>
      </theme-provider>
    `,
  }))
  .add('error', () => ({
    data() {
      return {
        value: false,
        error: 'is-error',
      };
    },
    methods,
    components: { VCheckbox },
    template: `
      <theme-provider>
        <v-checkbox
          v-model="value"
          :error="error"
          @input="onInput"
        >
          {{ error }}
        </v-checkbox>
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    methods,
    components: { VCheckbox },
    data() {
      return {
        model: null,
      };
    },
    template: `
      <theme-provider>
        <v-checkbox
          v-model="model"
          disabled
          @input="onInput"
        >
          disabled
        </v-checkbox>
        <br/>
        <v-checkbox
          v-model="model"
          disabled
          :true-value="null"
          @input="onInput"
        >
          disabled
        </v-checkbox>
      </theme-provider>
    `,
  }));

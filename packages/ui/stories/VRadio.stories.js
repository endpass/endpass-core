import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VRadio from '@/kit/VRadio';

const methods = {
  onChange: action('onChange'),
};

storiesOf('VRadio/desktop', module)
  .add('default', () => ({
    methods,
    components: { VRadio },
    data() {
      return {
        state: 'foo',
      };
    },
    template: `
    <theme-provider>
      <span>State: {{state}}</span>
      <v-radio
        v-model="state"
        name="value"
        value="foo"
      >
        Foo
      </v-radio>
      <v-radio
        v-model="state"
        name="value"
        value="bar"
      >
        Bar
      </v-radio>
      <v-radio
        v-model="state"
        name="value"
        value="baz"
      >
        Baz
      </v-radio>
    </theme-provider>
  `,
  }))
  .add('error', () => ({
    methods,
    components: { VRadio },
    data() {
      return {
        state: 'foo',
      };
    },
    template: `
    <theme-provider>
      <span>State: {{state}}</span>
      <v-radio
        v-model="state"
        name="value"
        value="foo"
        :is-error="true"
      >
        Foo
      </v-radio>
      <v-radio
        v-model="state"
        name="value"
        value="bar"
        :is-error="true"
      >
        Bar
      </v-radio>
      <v-radio
        v-model="state"
        name="value"
        value="baz"
        :is-error="true"
      >
        Baz
      </v-radio>
    </theme-provider>
  `,
  }))
  .add('disabled', () => ({
    methods,
    components: { VRadio },
    data() {
      return {
        state: 'foo',
      };
    },
    template: `
    <theme-provider>
      <span>State: {{state}}</span>
      <v-radio
        v-model="state"
        name="value"
        value="foo"
        :disabled="true"
      >
        Foo
      </v-radio>
      <v-radio
        v-model="state"
        name="value"
        value="bar"
        :disabled="true"
      >
        Bar
      </v-radio>
      <v-radio
        v-model="state"
        name="value"
        value="baz"
        :disabled="true"
      >
        Baz
      </v-radio>
    </theme-provider>
  `,
  }));

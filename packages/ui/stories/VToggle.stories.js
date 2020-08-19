import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VToggle from '@/kit/VToggle';

const methods = {
  onChange: action('onChange'),
};

storiesOf('VToggle/desktop', module)
  .add('default state false', () => ({
    methods,
    components: { VToggle },
    data() {
      return {
        value: false,
        valueMini: false,
      };
    },
    template: `
      <theme-provider>
        <v-toggle
          v-model="value"
          @change="onChange"
        >
          state: {{ value }}
        </v-toggle>
        <br/>
        <v-toggle
          size="mini"
          v-model="valueMini"
          @change="onChange"
        >
          state: {{ valueMini }}
        </v-toggle>
        <br/>
        <v-toggle
          skin="secondary"
          v-model="value"
          @change="onChange"
        >
          state: {{ value }}
        </v-toggle>
        <br/>
        <v-toggle
          size="mini"
          skin="secondary"
          v-model="valueMini"
          @change="onChange"
        >
          state: {{ valueMini }}
        </v-toggle>
      </theme-provider>
    `,
  }))

  .add('default state true', () => ({
    methods,
    components: { VToggle },
    data() {
      return {
        value: true,
        valueMini: true,
      };
    },
    template: `
      <theme-provider>
        <v-toggle
          v-model="value"
          @change="onChange"
        >
          state: {{ value }}
        </v-toggle>
        <br/>
        <v-toggle
          size="mini"
          v-model="valueMini"
          @change="onChange"
        >
          state: {{ valueMini }}
        </v-toggle>
      </theme-provider>
    `,
  }))

  .add('default state', () => ({
    methods,
    components: { VToggle },
    data() {
      return {
        model: false,
        modelMini: false,
      };
    },
    template: `
      <theme-provider>
        <v-toggle
          v-model="model"
          name="Name"
          @change="onChange"
        >
          state: {{ model }}
        </v-toggle>
        <br/>
        <v-toggle
          size="mini"
          name="Name"
          v-model="modelMini"
          @change="onChange"
        >
          state: {{ modelMini }}
        </v-toggle>
      </theme-provider>
    `,
  }))
  .add('array', () => ({
    methods,
    components: { VToggle },
    data() {
      return {
        model: ['Bob', 'Alice'],
        modelMini: ['Bob', 'Alice'],
      };
    },
    template: `
      <theme-provider>
        <v-toggle
          v-model="model"
          value="Crypto!"
          name="Name"
          @change="onChange"
        >
          with Crypto!
        </v-toggle>
        <div>persons: {{ model.join(', ') }}</div>
        <v-toggle
          size="mini"
          name="Name"
          value="Crypto!"
          v-model="modelMini"
          @change="onChange"
        >
          with Crypto!
        </v-toggle>
        <div>persons: {{ modelMini.join(', ') }}</div>
      </theme-provider>
    `,
  }))
  .add('true/false attr', () => ({
    methods,
    components: { VToggle },
    data() {
      return {
        model: 'no',
        modelMini: 'no',
      };
    },
    template: `
      <theme-provider>
        <v-toggle
          v-model="model"
          name="Name"
          true-value="yes"
          false-value="no"
          @change="onChange"
        >
          state: {{ model }}
        </v-toggle>
        <br/>
        <v-toggle
          size="mini"
          name="Name"
          true-value="yes"
          false-value="no"
          v-model="modelMini"
          @change="onChange"
        >
          state: {{ modelMini }}
        </v-toggle>
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    methods,
    components: { VToggle },
    data() {
      return {
        model: null,
      };
    },
    template: `
      <theme-provider>
        <v-toggle
          v-model="model"
          :disabled="true"
          @input="onChange"
        >
          disabled
        </v-toggle>
        <br/>
        <v-toggle
          v-model="model"
          :disabled="true"
          size="mini"
          :true-value="null"
          @input="onChange"
        >
          disabled
        </v-toggle>
      </theme-provider>
    `,
  }));

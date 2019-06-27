import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VSelect from '@/kit/VSelect';

const methods = {
  onInput: action('onInput'),
  onHover: action('onHover'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
};

storiesOf('VSelect/desktop', module)
  .add('enabled', () => ({
    methods,
    components: { VSelect },
    data() {
      return {
        model: 'value',
        options: [
          { val: 'value', text: 'text option 1' },
          { val: 'next value', text: 'next option' },
        ],
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    template: `
      <theme-provider>
        <v-select
          style="width: 288px;"
          v-model="model"
          placeholder="Placeholder text"
          @input="onInput"
          :options="options"
          :label="label"
          :description="description"
        />
        <p>model: {{ model }}</p>
        <p>options: {{ options }}</p>        
      </theme-provider>
    `,
  }))
  .add('flat array', () => ({
    data() {
      return {
        // model: 'value',
        // options: [{ val: 'value', text: 'text option 1' }, { val: 'next value', text: 'next option' }],
        model: 'option 1',
        options: ['option 1', 'option 2'],
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    methods,
    components: { VSelect },
    template: `
      <theme-provider>
        <v-select
          v-model="model"
          style="width: 288px;"
          placeholder="Placeholder text"
          :options="options"
          :label="label"
          :description="description"
          @input="onInput"
        />
        <p>model: {{ model }}</p>
        <p>options: {{ options }}</p>        
      </theme-provider>
    `,
  }))
  .add('error', () => ({
    data() {
      return {
        error: 'Error message here',
        model: 'value',
        options: [
          { val: 'value', text: 'text option 1' },
          { val: 'next value', text: 'next option' },
        ],
        label: 'Label',
        description: 'Helper text goes here',
      };
    },
    methods,
    components: { VSelect },
    template: `
      <theme-provider>
        <v-select
          v-model="model"
          :error="error"
          style="width: 288px;"
          placeholder="Placeholder text"
          :options="options"
          :label="label"
          :description="description"
        />
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    methods,
    components: { VSelect },
    data() {
      return {
        model: null,
        label: 'Label',
        options: [
          { val: 'value', text: 'text option 1' },
          { val: 'next value', text: 'next option' },
        ],
        description: 'Helper text goes here',
      };
    },
    template: `
      <theme-provider>
        <v-select
          v-model="model"
          disabled="true"
          style="width: 288px;"
          placeholder="Placeholder text"
          :options="options"
          :label="label"
          :description="description"
        />
      </theme-provider>
    `,
  }));

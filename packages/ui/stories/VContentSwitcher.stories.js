import { storiesOf } from '@storybook/vue'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line
import VContentSwitcher from '@/kit/VContentSwitcher/VContentSwitcher';

const methods = {
  onChange: action('onChange'),
};

storiesOf('VContentSwitcher/desktop', module)
  .add('simple array strings', () => ({
    methods,
    components: { VContentSwitcher },
    data() {
      return {
        value: null,
        model: ['Left section', 'Middle section', 'Right section'],
      };
    },
    template: `
      <theme-provider>
        <v-content-switcher
          v-model="value"
          :items="model"
          @change="onChange"
        />
        <div>state: {{ value }}</div>
      </theme-provider>
    `,
  }))
  .add('array objects', () => ({
    methods,
    components: { VContentSwitcher },
    data() {
      return {
        value: 0,
        model: [
          { value: 0, label: 'Left section' },
          { value: 1, label: 'Middle section' },
          { value: 2, label: 'Middle section' },
          { value: 3, label: 'Right section' },
        ],
      };
    },
    template: `
      <theme-provider>
        <v-content-switcher
          v-model="value"
          :items="model"
          @change="onChange"
        />
        <div>state: {{ value }}</div>
      </theme-provider>
    `,
  }));

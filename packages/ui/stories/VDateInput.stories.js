import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VDateInput from '@/kit/VDateInput';

const methods = {
  onChange: action('onChange')
}

storiesOf('VDateInput/desktop', module)
  .add('default', () => ({
    data: () => ({
      model: new Date()
    }),
    methods,
    components: { VDateInput },
    template: `
      <theme-provider>
        <v-date-input v-model="model" @change="onChange" />
      </theme-provider>
    `,
  }));

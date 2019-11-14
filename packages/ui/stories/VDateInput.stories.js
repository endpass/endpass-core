import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VDateInput from '@/kit/VDateInput';

const methods = {
  onChange: action('onChange'),
};

storiesOf('VDateInput/desktop', module)
  .add('default', () => ({
    data: () => ({
      model: new Date(),
    }),
    methods,
    components: { VDateInput },
    template: `
      <theme-provider>
        <v-date-input v-model="model" @change="onChange" />
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    data: () => ({
      model: new Date(),
    }),
    methods,
    components: { VDateInput },
    template: `
      <theme-provider>
        <v-date-input v-model="model" :disabled="true" @change="onChange" />
      </theme-provider>
    `,
  }))
  .add('empty initial state', () => ({
    data: () => ({
      model: null,
    }),
    methods,
    components: { VDateInput },
    template: `
      <theme-provider>
        <v-date-input v-model="model" placeholder="Select the date..." @change="onChange" />
      </theme-provider>
    `,
  }))
  .add('with label', () => ({
    data: () => ({
      model: new Date(),
    }),
    methods,
    components: { VDateInput },
    template: `
      <theme-provider>
        <v-date-input v-model="model" label="Input label" placeholder="select the date..." @change="onChange" />
      </theme-provider>
    `,
  }));

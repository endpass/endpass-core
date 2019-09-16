import { storiesOf } from '@storybook/vue';
import VDivider from '@/kit/VDivider';

storiesOf('VDivider/desktop', module)
  .add('default', () => ({
    components: { VDivider },
    template: `
      <theme-provider>
        <v-divider style="width: 378px;"></v-divider>
      </theme-provider>
    `,
  }))
  .add('with text', () => ({
    components: { VDivider },
    template: `
      <theme-provider>
        <v-divider style="width: 378px;">or register in with</v-divider>
      </theme-provider>
    `,
  }));


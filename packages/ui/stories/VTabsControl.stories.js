import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VTabsControl from '@/kit/VTabsControl';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VTabsControl/desktop', module).add('default', () => ({
  methods,
  components: { VTabsControl },
  template: `
      <theme-provider>
        <v-tabs-control label="Common control" @click="onClick" />
        <v-tabs-control label="Active control" :is-active="true" @click="onClick" />
      </theme-provider>
    `,
}));

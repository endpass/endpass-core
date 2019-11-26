import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VTabs from '@/kit/VTabs';
import VTab from '@/kit/VTab';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VTabs/desktop', module).add('default', () => ({
  methods,
  components: { VTabs, VTab },
  template: `
      <theme-provider>
        <v-tabs>
            <v-tab label="Foo" data-test="foo-tab" @click="onClick">
            Foo content
          </v-tab>
          <v-tab label="Bar" data-test="bar-tab" @click="onClick">
            Bar content
          </v-tab>          
        </v-tabs>
      </theme-provider>
    `,
}));

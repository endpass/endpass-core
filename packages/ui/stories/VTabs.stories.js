import { storiesOf } from '@storybook/vue';
import VTabs from '@/kit/VTabs';
import VTab from '@/kit/VTab';

storiesOf('VTabs/desktop', module).add('default', () => ({
  components: { VTabs, VTab },
  template: `
      <theme-provider>
        <v-tabs>
          <v-tab label="Foo" data-test="foo-tab">
            Foo content
          </v-tab>
          <v-tab label="Bar" data-test="bar-tab">
            Bar content
          </v-tab>
        </v-tabs>
      </theme-provider>
    `,
}));

import { storiesOf } from '@storybook/vue';
import VTabs from '@/kit/VTabs';
import VTab from '@/kit/VTab';

storiesOf('VTabs/desktop', module).add('default', () => ({
  components: { VTabs, VTab },
  template: `
      <theme-provider>
        <v-tabs>
          <v-tab label="Foo">
            Foo content
          </v-tab>
          <v-tab label="Bar">
            Bar content
          </v-tab>
        </v-tabs>
      </theme-provider>
    `,
}));

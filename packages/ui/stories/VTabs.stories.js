import { storiesOf } from '@storybook/vue';
import VTabs from '@/kit/VTabs';
import VTabsControl from '@/kit/VTabsControl';

storiesOf('VTabs/desktop', module).add('default', () => ({
  data: () => ({
    activeTab: 'foo',
  }),
  methods: {
    onTabClick(tab) {
      this.activeTab = tab;
    },
  },
  components: { VTabs, VTabsControl },
  template: `
      <theme-provider>
        <v-tabs>
          <v-tabs-control
            label="Foo"
            :is-active="activeTab === 'foo'"
            @click="onTabClick('foo')"
          />
          <v-tabs-control
            label="Bar"
            :is-active="activeTab === 'bar'"
            @click="onTabClick('bar')"
          />
          <template slot="content">
            <div v-if="activeTab === 'foo'">
              Foo content
            </div>
            <div v-if="activeTab === 'bar'">
              Bar content
            </div>
          </template>
        </v-tabs>
      </theme-provider>
    `,
}));

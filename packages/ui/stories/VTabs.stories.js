import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VTabs from '@/kit/VTabs';
import VTab from '@/kit/VTab';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VTabs/desktop', module)
  .add('default', () => ({
    methods,
    components: { VTabs, VTab },
    template: `
        <theme-provider>
          <v-tabs>
            <v-tab id="foo" label="Foo" data-test="foo-tab" @click="onClick">
              Foo content
            </v-tab>
            <v-tab id="bar" label="Bar" data-test="bar-tab" @click="onClick">
              Bar content
            </v-tab>
          </v-tabs>
        </theme-provider>
      `,
  }))
  .add('initial tab', () => ({
    methods,
    components: { VTabs, VTab },
    template: `
        <theme-provider>
          <v-tabs initial-tab="bar">
            <v-tab id="foo" label="Foo" data-test="foo-tab" @click="onClick">
              Foo content
            </v-tab>
            <v-tab id="bar" label="Bar" data-test="bar-tab" @click="onClick">
              Bar content
            </v-tab>
          </v-tabs>
        </theme-provider>
      `,
  }))
  .add('conditional', () => ({
    data: () => ({
      isToggled: false,
    }),
    components: { VTabs, VTab },
    template: `
      <theme-provider>
        <div>
          <label>
            <input v-model="isToggled" type="checkbox" />
            Tabs toggled: {{ isToggled }}
          </label>
        </div>
        <div>
          <v-tabs v-if="!isToggled">
            <v-tab id="foo" label="Foo 1" data-test="foo-tab">
              Foo content 1
            </v-tab>
            <v-tab id="bar" label="Bar 1" data-test="bar-tab">
              Bar content 1
            </v-tab>
          </v-tabs>
          <v-tabs v-else>
            <v-tab id="foo" label="Foo 2" data-test="foo-tab">
              Foo content 2
            </v-tab>
            <v-tab id="bar" label="Bar 2" data-test="bar-tab">
              Bar content 2
            </v-tab>
          </v-tabs>
          </div>
        </theme-provider>
      `,
  }));

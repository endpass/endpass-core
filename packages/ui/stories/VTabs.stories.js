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
            <v-tab label="Foo" data-test="foo-tab" @click="onClick">
              Foo content
            </v-tab>
            <v-tab label="Bar" data-test="bar-tab" @click="onClick">
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
          <v-tabs>
            <v-tab label="Foo" data-test="foo-tab" @click="onClick">
              Foo content
            </v-tab>
            <v-tab label="Bar" data-test="bar-tab" :is-active="true" @click="onClick">
              Bar content
            </v-tab>
          </v-tabs>
        </theme-provider>
      `,
  }))
  .add('interactive', () => ({
    methods: {
      ...methods,

      onClickAddButton() {
        this.tabs.push(Math.random());
      },

      onClickRemoveButton(index) {
        this.tabs.splice(index, 1);
      },
    },
    data: () => ({
      tabs: [],
    }),
    components: { VTabs, VTab },
    template: `
        <theme-provider>
          <button @click="onClickAddButton">Add tab</button>
          <v-tabs>
            <v-tab v-for="(tab, i) in tabs" :key="tab" :label="tab.toString()" @click="onClick">
              <button @click="onClickRemoveButton(i)">Remove {{ tab }} tab</button>
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
            <v-tab label="Foo 1" data-test="foo-tab">
              Foo content 1
            </v-tab>
            <v-tab label="Bar 1" data-test="bar-tab">
              Bar content 1
            </v-tab>
          </v-tabs>
          <v-tabs v-else>
            <v-tab label="Foo 2" data-test="foo-tab">
              Foo content 2
            </v-tab>
            <v-tab label="Bar 2" data-test="bar-tab">
              Bar content 2
            </v-tab>
          </v-tabs>
          </div>
        </theme-provider>
      `,
  }));

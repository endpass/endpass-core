import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VNavSidebarControl from '@/kit/VNavSidebarControl';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VNavSidebarControl/desktop', module)
  .add('default', () => ({
    components: { VNavSidebarControl },
    template: `
      <theme-provider>
        <v-nav-sidebar-control href="#">
          Link
        </v-nav-sidebar-control>
      </theme-provider>
    `,
  }))
  .add('active', () => ({
    components: { VNavSidebarControl },
    template: `
      <theme-provider>
        <v-nav-sidebar-control :isActive="true" href="#">
          Active link
        </v-nav-sidebar-control>
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    components: { VNavSidebarControl },
    template: `
      <theme-provider>
        <v-nav-sidebar-control :disabled="true" href="#">
          Disabled link
        </v-nav-sidebar-control>
      </theme-provider>
    `,
  }))
  .add('as button', () => ({
    methods,
    components: { VNavSidebarControl },
    template: `
      <theme-provider>
        <v-nav-sidebar-control @click="onClick">
          Button
        </v-nav-sidebar-control>
      </theme-provider>
    `,
  }))
  .add('as disabled button', () => ({
    methods,
    components: { VNavSidebarControl },
    template: `
      <theme-provider>
        <v-nav-sidebar-control :disabled="true" @click="onClick">
          Disabled button
        </v-nav-sidebar-control>
      </theme-provider>
    `,
  }));

import { storiesOf } from '@storybook/vue';
import VNavSidebarSubMenu from '@/kit/VNavSidebarSubMenu';
import VNavSidebarControl from '@/kit/VNavSidebarControl';
import VSvgIcon from '@/kit/VSvgIcon';

storiesOf('VNavSidebarSubMenu/desktop', module)
  .add('default', () => ({
    components: { VNavSidebarSubMenu, VNavSidebarControl },
    template: `
      <theme-provider>
        <v-nav-sidebar-sub-menu label="Submenu">
          <v-nav-sidebar-control>
            Link one
          </v-nav-sidebar-control>
          <v-nav-sidebar-control :disabled="true">
            Link two
          </v-nav-sidebar-control>
          <v-nav-sidebar-control :is-active="true">
            Link three
          </v-nav-sidebar-control>
        </v-nav-sidebar-sub-menu>
      </theme-provider>
    `,
  }))
  .add('with icon as prop', () => ({
    components: { VNavSidebarSubMenu, VNavSidebarControl },
    template: `
      <theme-provider>
        <v-nav-sidebar-sub-menu label="Submenu" icon="check">
          <v-nav-sidebar-control>
            Link one
          </v-nav-sidebar-control>
          <v-nav-sidebar-control :disabled="true">
            Link two
          </v-nav-sidebar-control>
          <v-nav-sidebar-control :is-active="true">
            Link three
          </v-nav-sidebar-control>
        </v-nav-sidebar-sub-menu>
      </theme-provider>
    `,
  }))
  .add('with icon as slot', () => ({
    components: { VNavSidebarSubMenu, VNavSidebarControl, VSvgIcon },
    template: `
      <theme-provider>
        <v-nav-sidebar-sub-menu label="Submenu">
          <v-svg-icon slot="icon" name="check" />
          <v-nav-sidebar-control>
            Link one
          </v-nav-sidebar-control>
          <v-nav-sidebar-control :disabled="true">
            Link two
          </v-nav-sidebar-control>
          <v-nav-sidebar-control :is-active="true">
            Link three
          </v-nav-sidebar-control>
        </v-nav-sidebar-sub-menu>
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    components: { VNavSidebarSubMenu, VNavSidebarControl, VSvgIcon },
    template: `
      <theme-provider>
        <v-nav-sidebar-sub-menu label="Submenu" :disabled="true">
          <v-nav-sidebar-control>
            Link one
          </v-nav-sidebar-control>
          <v-nav-sidebar-control :disabled="true">
            Link two
          </v-nav-sidebar-control>
          <v-nav-sidebar-control :is-active="true">
            Link three
          </v-nav-sidebar-control>
        </v-nav-sidebar-sub-menu>
      </theme-provider>
    `,
  }));

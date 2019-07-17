import { storiesOf } from '@storybook/vue';
import VDivider from '@/kit/VDivider';
import VNavSidebar from '@/kit/VNavSidebar';
import VHeader from '@/kit/VHeader';
import VNavDivider from '@/kit/VNavDivider';
import VNavIconButton from '@/kit/VNavIconButton';
import VNavSubMenu from '@/kit/VNavSubMenu';
import VNavControl from '@/kit/VNavControl';
import VNavSidebarSubMenu from '@/kit/VNavSidebarSubMenu';
import VNavSidebarControl from '@/kit/VNavSidebarControl';
import VSvgIcon from '@/kit/VSvgIcon';

storiesOf('VNavSidebar/desktop', module).add('default', () => ({
  data: () => ({
    isSidebarVisible: false,
  }),
  computed: {
    currentIcon() {
      return !this.isSidebarVisible ? 'menu' : 'close';
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
  },
  components: {
    VDivider,
    VNavSidebar,
    VHeader,
    VNavDivider,
    VNavIconButton,
    VNavSubMenu,
    VNavControl,
    VSvgIcon,
    VNavSidebarSubMenu,
    VNavSidebarControl,
  },
  template: `
      <theme-provider>
        <div style="position: relative; height: 100vh">
          <v-header>
            <v-nav-icon-button :icon="currentIcon" @click="toggleSidebar" />
            <v-nav-divider />
            <v-nav-control>Item one</v-nav-control>
            <v-nav-control>Item two</v-nav-control>
            <v-nav-control>Item three</v-nav-control>
            <v-nav-sub-menu label="Sub-menu">
              <v-nav-control>Item four</v-nav-control>
              <v-nav-control>Item five</v-nav-control>
              <v-nav-control>Item six</v-nav-control>
            </v-nav-sub-menu>
          </v-header>
          <v-nav-sidebar v-if="isSidebarVisible">
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
            <v-nav-sidebar-sub-menu label="Submenu with icon" icon="check">
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
            <v-nav-sidebar-control>
              Single link one
            </v-nav-sidebar-control>
            <v-nav-sidebar-control>
              Single link two
            </v-nav-sidebar-control>
            <div style="padding: 0 16px">
              <v-divider />
            </div>
            <v-nav-sidebar-control :is-active="true">
              Single link three
            </v-nav-sidebar-control>
          </v-nav-sidebar>
        </div>
      </theme-provider>
    `,
}));

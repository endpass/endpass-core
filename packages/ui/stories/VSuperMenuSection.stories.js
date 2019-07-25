import { storiesOf } from '@storybook/vue';
import VSuperMenuSection from '@/kit/VSuperMenuSection';
import VSuperMenuControl from '@/kit/VSuperMenuControl';

storiesOf('VSuperMenuSection/desktop', module).add('default', () => ({
  components: { VSuperMenuSection, VSuperMenuControl },
  template: `
      <theme-provider>
        <v-super-menu-section label="First section">
          <v-super-menu-control icon="apps">
            Apps
          </v-super-menu-control>
          <v-super-menu-control icon="users" :is-active="true">
            Users
          </v-super-menu-control>
          <v-super-menu-control icon="permission">
            Permissions
          </v-super-menu-control>
        </v-super-menu-section>
        <v-super-menu-section label="Second section">
          <v-super-menu-control icon="profile">
            Profile
          </v-super-menu-control>
          <v-super-menu-control icon="activity">
            Activity
          </v-super-menu-control>
        </v-super-menu-section>
      </theme-provider>
    `,
}));

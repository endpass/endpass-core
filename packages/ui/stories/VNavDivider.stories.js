import { storiesOf } from '@storybook/vue';
import VNavDivider from '@/kit/VNavDivider';
import VHeader from '@/kit/VHeader';

storiesOf('VNavDivider/desktop', module).add('default', () => ({
  components: { VNavDivider, VHeader },
  template: `
      <theme-provider>
        <v-header>
          Some
          <v-nav-divider />
          divided
          <v-nav-divider />
          content
          <v-nav-divider />
          in
          <v-nav-divider />
          header
        </v-header>
      </theme-provider>
    `,
}));

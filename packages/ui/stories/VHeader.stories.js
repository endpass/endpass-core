import { storiesOf } from '@storybook/vue';
import VHeader from '@/kit/VHeader';
import VNavDivider from '@/kit/VNavDivider';
import VNavIconButton from '@/kit/VNavIconButton';
import VNavSubMenu from '@/kit/VNavSubMenu';
import VNavControl from '@/kit/VNavControl';
import VSvgIcon from '@/kit/VSvgIcon';

storiesOf('VHeader/desktop', module).add('default', () => ({
  components: {
    VHeader,
    VNavDivider,
    VNavIconButton,
    VNavSubMenu,
    VNavControl,
    VSvgIcon,
  },
  template: `
      <theme-provider>
        <v-header>
          <v-nav-icon-button icon="menu" />
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
      </theme-provider>
    `,
}));

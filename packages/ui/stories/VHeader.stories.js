import { storiesOf } from '@storybook/vue';
import VHeader from '@/kit/VHeader';
import VNavDivider from '@/kit/VNavDivider';
import VNavIconButton from '@/kit/VNavIconButton';
import VNavSubMenu from '@/kit/VNavSubMenu';
import VNavControl from '@/kit/VNavControl';
import VLogo from '@/kit/VLogo';
import VSvgIcon from '@/kit/VSvgIcon';

storiesOf('VHeader/desktop', module)
  .add('default', () => ({
    components: {
      VHeader,
      VNavDivider,
      VNavIconButton,
      VNavSubMenu,
      VNavControl,
      VSvgIcon,
      VLogo,
    },
    template: `
      <theme-provider>
        <v-header>
          <v-nav-icon-button icon="menu" />
          <v-nav-divider />
          <v-logo />
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
  }))
  .add('secondary', () => ({
    components: {
      VHeader,
      VNavDivider,
      VNavIconButton,
      VNavSubMenu,
      VNavControl,
      VSvgIcon,
      VLogo,
    },
    template: `
      <theme-provider>
        <v-header skin="secondary">
          <v-nav-icon-button icon="menu" skin="secondary" />
          <v-nav-divider />
          <v-logo />
          <v-nav-divider />
          <v-nav-control skin="secondary">Item one</v-nav-control>
          <v-nav-control skin="secondary">Item two</v-nav-control>
          <v-nav-control skin="secondary">Item three</v-nav-control>
          <v-nav-sub-menu skin="secondary" label="Sub-menu">
            <v-nav-control skin="secondary">Item four</v-nav-control>
            <v-nav-control skin="secondary">Item five</v-nav-control>
            <v-nav-control skin="secondary">Item six</v-nav-control>
          </v-nav-sub-menu>
        </v-header>
      </theme-provider>
    `,
  }));

import { storiesOf } from '@storybook/vue';
import VNavSubMenu from '@/kit/VNavSubMenu';
import VNavControl from '@/kit/VNavControl';

storiesOf('VNavSubMenu/desktop', module).add('default', () => ({
  data: () => ({
    items: [
      {
        label: 'First link',
        href: '#',
      },
      {
        label: 'Second link',
        href: '#',
      },
      {
        label: 'Third link',
        href: '#',
      },
    ],
  }),
  components: { VNavSubMenu, VNavControl },
  template: `
    <theme-provider>
      <v-nav-sub-menu label="Submenu" :items="items">
        <v-nav-control>Item one</v-nav-control>
        <v-nav-control>Item two</v-nav-control>
        <v-nav-control>Item three</v-nav-control>
      </v-nav-sub-menu>
    </theme-provider>
  `,
}));

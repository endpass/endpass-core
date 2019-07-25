import { storiesOf } from '@storybook/vue';
import VLabel from '@/kit/VLabel';

storiesOf('VLabel/desktop', module).add('default', () => ({
  components: { VLabel },
  template: `
      <theme-provider>
        <v-label label="Label text" />
        Following content
        <br/><br/>
        <v-label label="Disabled label" disabled/>
        Following content
      </theme-provider>
    `,
}));

import { storiesOf } from '@storybook/vue';
import VDescription from '@/kit/VDescription';

storiesOf('VDescription/desktop', module).add('default', () => ({
  components: { VDescription },
  template: `
      <theme-provider>
        <v-description description="Description text" />
        Following content        
        <br/><br/>  
        <v-description description="Disabled description" disabled/>
        Following content
      </theme-provider>
    `,
}));

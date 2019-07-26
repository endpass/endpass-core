import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VIconControl from '@/kit/VIconControl';
import VSvgIcon from '@/kit/VSvgIcon';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VIconControl/desktop', module)
  .add('default', () => ({
    methods,
    components: { VIconControl, VSvgIcon },
    template: `
      <theme-provider>
        <v-icon-control @click="onClick">
          <v-svg-icon name="check" slot="icon" />
          Control text
        </v-icon-control>
      </theme-provider>
    `,
  }))
  .add('with icon as prop', () => ({
    methods,
    components: { VIconControl, VSvgIcon },
    template: `
      <theme-provider>
        <v-icon-control icon="check" @click="onClick">
          Control text
        </v-icon-control>
      </theme-provider>
    `,
  }));

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VIconButton from '@/kit/VIconButton';
import VSvgIcon from '@/kit/VSvgIcon';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VIconButton/desktop', module)
  .add('default', () => ({
    methods,
    components: { VIconButton, VSvgIcon },
    template: `
      <theme-provider>
        <v-icon-button @click="onClick">
          <v-svg-icon width="32px" height="32px" name="check" />
        </v-icon-button>
      </theme-provider>
    `,
  }))
  .add('with icon as prop', () => ({
    methods,
    components: { VIconButton, VSvgIcon },
    template: `
      <theme-provider>
        <v-icon-button icon="check" @click="onClick" />
      </theme-provider>
    `,
  }));

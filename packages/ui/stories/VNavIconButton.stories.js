import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VNavIconButton from '@/kit/VNavIconButton';
import VSvgIcon from '@/kit/VSvgIcon';

const methods = {
  onClick: action('onClick'),
};

storiesOf('VNavIconButton/desktop', module)
  .add('default', () => ({
    methods,
    components: { VNavIconButton, VSvgIcon },
    template: `
      <theme-provider>
        <v-nav-icon-button @click="onClick">
          <v-svg-icon name="check" />
        </v-nav-icon-button>
      </theme-provider>
    `,
  }))
  .add('active', () => ({
    methods,
    components: { VNavIconButton, VSvgIcon },
    template: `
      <theme-provider>
        <v-nav-icon-button :is-active="true" @click="onClick">
          <v-svg-icon name="check" />
        </v-nav-icon-button>
      </theme-provider>
    `,
  }))
  .add('with icon as prop', () => ({
    methods,
    components: { VNavIconButton, VSvgIcon },
    template: `
      <theme-provider>
        <v-nav-icon-button icon="check" @click="onClick" />
      </theme-provider>
    `,
  }));

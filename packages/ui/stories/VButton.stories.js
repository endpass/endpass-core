import Vue from 'vue';
import { storiesOf } from '@storybook/vue'; // eslint-disable-line
import { VButton } from '@/components';

Vue.component('VButton', VButton);

storiesOf('VButton', module)
  .add('with text', () => '<v-button>sample button</v-button>')
  .add('with emoji', () => '<v-button>😀 😎 👍 💯</v-button>')
  .add('disabled', () => '<v-button :disabled="true">💯disabled</v-button>')
  .add('loading', () => '<v-button :loading="true">loading💯</v-button>')
  .add('as a component', () => ({
    components: { VButton },
    template:
      '<v-button :class-name="\'is-primary is-normal\'">as a component</v-button>',
  }));

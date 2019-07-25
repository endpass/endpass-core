import { storiesOf } from '@storybook/vue';
import VSvgIcon from '@/kit/VSvgIcon';

storiesOf('VSvgIcon/desktop', module).add('default', () => ({
  data: () => ({
    icons: icons || [],
  }),
  components: { VSvgIcon },
  template: `
      <theme-provider>
        <div class="storybook-grid icons">
          <div v-for="icon in icons" :key="icon" class="storybook-grid-cell">
            <div>
              <v-svg-icon :name="icon" height="100%" width="100%" />
            </div>
            <span>{{icon}}</span>
          </div>
        </div>
      </theme-provider>
    `,
}));

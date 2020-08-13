import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VLinkCollapse from '@/kit/VLinkCollapse';

storiesOf('VLinkCollapse/desktop', module).add('default', () => ({
  components: { VLinkCollapse },
  data() {
    return {
      isCollapsed: true,
    };
  },
  methods: {
    onClick() {
      this.isCollapsed = !this.isCollapsed;
      action('onClick');
    },
  },
  computed: {
    title() {
      if (this.isCollapsed) return 'Show more';
      return 'Show less';
    },
  },
  template: `
      <theme-provider>
        <table class="storybook-table">
          <tr>
            <td>
              <div>
                <v-link-collapse
                  :is-collapsed="isCollapsed"
                  @click="onClick"
                >
                  {{ title }}
                </v-link-collapse>
              </div>
            </td>
          </tr>
        </table>
      </theme-provider>
  `,
}));

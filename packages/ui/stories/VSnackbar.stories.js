import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VSnackbar from '@/kit/VSnackbar';
import VSnackbarLink from '@/kit/VSnackbarLink';
import VButton from '@/kit/VButton/VButton';

const methods = {
  onClose: action('onClose'),
  onAction: action('onAction'),
};

storiesOf('VSnackbar/desktop', module).add('default', () => ({
  methods,
  components: {
    VSnackbar,
    VSnackbarLink,
    VButton,
  },
  template: `
    <theme-provider>
      <table style="max-width: 400px;">
        <tr>
          <td>
            Links
          </td>
        </tr>
        <tr>
          <td>
            <v-snackbar
              skin="warning"
              is-multi-line
              @close="onClose"
            >
              two line text with one action<br/>two line text with one action
              <v-snackbar-link
                slot="control"
                @click="onAction"
              >
                Action
              </v-snackbar-link>
            </v-snackbar>
          </td>
        </tr>
        <tr>
          <td>
            <v-snackbar
              skin="warning"
              @close="onClose"
            >
              One line text with two actions
              <v-snackbar-link
                slot="control"
                @click="onAction"
              >
                Action
              </v-snackbar-link>
              <v-snackbar-link
                slot="control"
                @click="onAction"
              >
                Action
              </v-snackbar-link>
            </v-snackbar>
          </td>
        </tr>
        <tr>
          <td>
            <v-snackbar
              skin="warning"
              @close="onClose"
            >
              One line text with one action line text one action text with one action
              <v-snackbar-link
                slot="control"
                @click="onAction"
              >Action
              </v-snackbar-link>
            </v-snackbar>
          </td>
        </tr>
        <tr>
          <td>
            <v-snackbar
              skin="time"
              @close="onClose"
            >
              One line text with one actions
              <v-snackbar-link
                slot="control"
                @click="onAction"
              >Action
              </v-snackbar-link>
            </v-snackbar>
          </td>
        </tr>
        <tr>
          <td>
            <v-snackbar
              skin="error"
              @close="onClose"
            >
              One line text with one actions
              <v-snackbar-link
                slot="control"
                @click="onAction"
              >Action
              </v-snackbar-link>
            </v-snackbar>
          </td>
        </tr>
        <tr>
          <td>
            <v-snackbar
              skin="success"
              @close="onClose"
            >
              One line text with one actions<br>One line text with one actions
              <v-snackbar-link
                slot="control"
                @click="onAction"
              >Action
              </v-snackbar-link>
            </v-snackbar>
          </td>
        </tr>
        <tr>
          <td>
            <v-snackbar @close="onClose">
              One line text only
            </v-snackbar>
          </td>
        </tr>
      </table>
    </theme-provider>
  `,
}));

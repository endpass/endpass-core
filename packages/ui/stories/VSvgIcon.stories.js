import { storiesOf } from '@storybook/vue';
import VSvgIcon from '@/kit/VSvgIcon';

storiesOf('VSvgIcon/desktop', module).add('default', () => ({
  components: { VSvgIcon },
  template: `
      <theme-provider>
        <table class="storybook-table icons">
          <tr>
            <td>
              <div>
                <v-svg-icon name="endpass" height="100%" width="100%" />
              </div>
              <span>endpass</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="check" height="100%" width="100%" />
              </div>
              <span>check</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="chevron-down" height="100%" width="100%" />
              </div>
              <span>chevron-down</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="chevron-up" height="100%" width="100%" />
              </div>
              <span>chevron-up</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="close" height="100%" width="100%" />
              </div>
              <span>close</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="eye" height="100%" width="100%" />
              </div>
              <span>eye</span>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <v-svg-icon name="menu" height="100%" width="100%" />
              </div>
              <span>menu</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="action" height="100%" width="100%" />
              </div>
              <span>action</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="google" height="100%" width="100%" />
              </div>
              <span>google</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="github" height="100%" width="100%" />
              </div>
              <span>github</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="admin" height="100%" width="100%" />
              </div>
              <span>admin</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="apps-list" height="100%" width="100%" />
              </div>
              <span>apps-list</span>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <v-svg-icon name="home" height="100%" width="100%" />
              </div>
              <span>home</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="permission" height="100%" width="100%" />
              </div>
              <span>permission</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="docs" height="100%" width="100%" />
              </div>
              <span>docs</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="arrow-left" height="100%" width="100%" />
              </div>
              <span>arrow-left</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="logout" height="100%" width="100%" />
              </div>
              <span>logout</span>
            </td>
            <td>
              <div>
                <v-svg-icon name="error" height="100%" width="100%" />
              </div>
              <span>error</span>
            </td>
          </tr>
        </table>
      </theme-provider>
    `,
}));

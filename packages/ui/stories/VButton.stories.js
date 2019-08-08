import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VButton from '@/kit/VButton';
import VSvgIcon from '@/kit/VSvgIcon';

const methods = {
  onClick: action('onClick'),
  onEnter: action('onEnter'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
  onLeave: action('onLeave'),
};

storiesOf('VButton/desktop', module)
  .add('enabled', () => ({
    methods,
    components: { VButton },
    template: `
      <theme-provider>
        <table width="100%">
          <thead>
            <tr>
              <th></th>
              <th>Primary</th>
              <th>Secondary</th>
              <th>Tertiary</th>
              <th>Quaternary</th>
              <th>Ghost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Normal</th>
              <td><v-button @click="onClick">Button Label</v-button></td>
              <td><v-button @mouseenter="onEnter" skin="secondary">Button Label</v-button></td>
              <td><v-button @focus="onFocus" skin="tertiary">Button Label</v-button></td>
              <td><v-button @blur="onBlur" skin="quaternary">Button Label</v-button></td>
              <td><v-button @mouseleave="onLeave" skin="ghost">Button Label</v-button></td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td><v-button @click="onClick" size="big">Button Label</v-button></td>
              <td><v-button @mouseenter="onEnter" skin="secondary" size="big">Button Label</v-button></td>
              <td><v-button @focus="onFocus" skin="tertiary" size="big">Button Label</v-button></td>
              <td><v-button @blur="onBlur" skin="quaternary" size="big">Button Label</v-button></td>
              <td><v-button @mouseleave="onLeave" skin="ghost" size="big">Button Label</v-button></td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('change-skin', () => ({
    data() {
      return {
        skins: [
          'primary',
          'secondary',
          'tertiary',
          'quaternary',
          'quaternary-error',
          'ghost',
        ],
        skin: 'primary',
      };
    },
    methods: {
      ...methods,
      onSkinChange() {
        const index = this.skins.indexOf(this.skin);
        this.skin = this.skins[index + 1] || this.skins[0];
      },
    },
    components: { VButton },
    template: `
      <theme-provider>
        <v-button @click="onSkinChange" :skin="skin" style="width: 300px;">Click to change skin</v-button>
        skin:{{ this.skin }}
      </theme-provider>
    `,
  }))
  .add('icon', () => ({
    methods,
    components: { VSvgIcon, VButton },
    template: `
      <theme-provider>
        <table width="100%">
          <thead>
            <tr>
              <th></th>
              <th>Primary</th>
              <th>Secondary</th>
              <th>Tertiary</th>
              <th>Quaternary</th>
              <th>Ghost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Normal</th>
              <td>
                <v-button @click="onClick">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
              <td>
                <v-button @mouseenter="onEnter" skin="secondary">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
              <td>
                <v-button @focus="onFocus" skin="tertiary">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
              <td>
                <v-button @blur="onBlur" skin="quaternary">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
              <td>
                <v-button @mouseleave="onLeave" skin="ghost">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td>
                <v-button @click="onClick" size="big">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
              <td>
                <v-button @mouseenter="onEnter" skin="secondary" size="big">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
              <td>
                <v-button @focus="onFocus" skin="tertiary" size="big">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
              <td>
                <v-button @blur="onBlur" skin="quaternary" size="big">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
              <td>
                <v-button @mouseleave="onLeave" skin="ghost" size="big">
                  <template slot="default">Button Label</template>
                  <v-svg-icon name="action" slot="iconAfter" />
                </v-button>
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('state', () => ({
    methods,
    components: { VButton },
    template: `
      <theme-provider>
        <table width="100%">
          <thead>
            <tr>
              <th></th>
              <th>Success</th>
              <th>Error</th>
              <th>Quaternary Error</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Normal</th>
              <td><v-button @click="onClick" skin="success">Button Label</v-button></td>
              <td><v-button @click="onClick" skin="error">Button Label</v-button></td>
              <td><v-button @click="onClick" skin="quaternary-error">Button Label</v-button></td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td><v-button @click="onClick" skin="success" size="big">Button Label</v-button></td>
              <td><v-button @click="onClick" skin="error" size="big">Button Label</v-button></td>
              <td><v-button @click="onClick" skin="quaternary-error" size="big">Button Label</v-button></td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('social', () => ({
    methods,
    components: { VSvgIcon, VButton },
    template: `
      <theme-provider>
        <table width="100%">
          <thead>
            <tr>
              <th></th>
              <th>Google</th>
              <th>GitHub</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Normal</th>
              <td>
                <v-button @click="onClick" skin="social">
                  <v-svg-icon name="google" style="margin-right: 5px;" slot="iconBefore" />
                  <template slot="default">Google</template>
                </v-button>
              </td>
              <td>
                <v-button @click="onClick" skin="social">
                  <v-svg-icon name="github" style="margin-right: 5px;" slot="iconBefore" />
                  <template slot="default">GitHub</template>
                </v-button>
              </td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td>
                <v-button @click="onClick" skin="social" size="big">
                  <v-svg-icon name="google" style="margin-right: 5px;" slot="iconBefore" />
                  <template slot="default">Google</template>
                </v-button>
                </td>
              <td>
                <v-button @click="onClick" skin="social" size="big">
                  <v-svg-icon name="github" style="margin-right: 5px;" slot="iconBefore" />
                  <template slot="default">GitHub</template>
                </v-button>
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('disabled', () => ({
    methods,
    components: { VButton },
    template: `
      <theme-provider>
        <table width="100%">
          <thead>
            <tr>
              <th></th>
              <th>Primary</th>
              <th>Secondary</th>
              <th>Tertiary</th>
              <th>Quaternary</th>
              <th>Ghost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Normal</th>
              <td><v-button disabled @click="onClick">Button Label</v-button></td>
              <td><v-button disabled @mouseenter="onEnter" skin="secondary">Button Label</v-button></td>
              <td><v-button disabled @focus="onFocus" skin="tertiary">Button Label</v-button></td>
              <td><v-button disabled @blur="onBlur" skin="quaternary">Button Label</v-button></td>
              <td><v-button disabled @mouseleave="onLeave" skin="ghost">Button Label</v-button></td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td><v-button disabled @click="onClick" size="big">Button Label</v-button></td>
              <td><v-button disabled @mouseenter="onEnter" skin="secondary" size="big">Button Label</v-button></td>
              <td><v-button disabled @focus="onFocus" skin="tertiary" size="big">Button Label</v-button></td>
              <td><v-button disabled @blur="onBlur" skin="quaternary" size="big">Button Label</v-button></td>
              <td><v-button disabled @mouseleave="onLeave" skin="ghost" size="big">Button Label</v-button></td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('loading', () => ({
    methods,
    components: { VButton },
    template: `
      <theme-provider>
        <table width="100%">
          <thead>
            <tr>
              <th></th>
              <th>Primary</th>
              <th>Secondary</th>
              <th>Tertiary</th>
              <th>Quaternary</th>
              <th>Ghost</th>
              <th>Social</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Normal</th>
              <td><v-button :isLoading="true" @click="onClick">Button Label</v-button></td>
              <td><v-button :isLoading="true" @mouseenter="onEnter" skin="secondary">Button Label</v-button></td>
              <td><v-button :isLoading="true" @focus="onFocus" skin="tertiary">Button Label</v-button></td>
              <td><v-button :isLoading="true" @blur="onBlur" skin="quaternary">Button Label</v-button></td>
              <td><v-button :isLoading="true" @mouseleave="onLeave" skin="ghost">Button Label</v-button></td>
              <td>
                <v-button :isLoading="true" @mouseleave="onLeave" skin="social">
                  <v-svg-icon name="github" style="margin-right: 5px;" slot="iconBefore" />
                  <template slot="default">GitHub</template>
                </v-button>
              </td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td><v-button :isLoading="true" @click="onClick" size="big">Button Label</v-button></td>
              <td><v-button :isLoading="true" @mouseenter="onEnter" skin="secondary" size="big">Button Label</v-button></td>
              <td><v-button :isLoading="true" @focus="onFocus" skin="tertiary" size="big">Button Label</v-button></td>
              <td><v-button :isLoading="true" @blur="onBlur" skin="quaternary" size="big">Button Label</v-button></td>
              <td><v-button :isLoading="true" @mouseleave="onLeave" skin="ghost" size="big">Button Label</v-button></td>
              <td>
                <v-button :isLoading="true" @mouseleave="onLeave" skin="social" size="big">
                <v-svg-icon name="github" style="margin-right: 5px;" slot="iconBefore" />
                <template slot="default">GitHub</template>
                </v-button>
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }));

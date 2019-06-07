import { storiesOf } from '@storybook/vue'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line
import VButton from '@/components/VButton/VButton.vue';

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
        <table>
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
              <td><v-button @mouseenter="onEnter" :skin="'secondary'">Button Label</v-button></td>
              <td><v-button @focus="onFocus" :skin="'tertiary'">Button Label</v-button></td>
              <td><v-button @blur="onBlur" :skin="'quaternary'">Button Label</v-button></td>
              <td><v-button @mouseleave="onLeave" :skin="'ghost'">Button Label</v-button></td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td><v-button @click="onClick" :size="'big'">Button Label</v-button></td>
              <td><v-button @mouseenter="onEnter" :skin="'secondary'" :size="'big'">Button Label</v-button></td>
              <td><v-button @focus="onFocus" :skin="'tertiary'" :size="'big'">Button Label</v-button></td>
              <td><v-button @blur="onBlur" :skin="'quaternary'" :size="'big'">Button Label</v-button></td>
              <td><v-button @mouseleave="onLeave" :skin="'ghost'" :size="'big'">Button Label</v-button></td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('icon', () => ({
    methods,
    components: { VButton },
    template: `
      <theme-provider>
        <table>
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
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
              <td>
                <v-button @mouseenter="onEnter" :skin="'secondary'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
              <td>
                <v-button @focus="onFocus" :skin="'tertiary'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
              <td>
                <v-button @blur="onBlur" :skin="'quaternary'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
              <td>
                <v-button @mouseleave="onLeave" :skin="'ghost'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td>
                <v-button @click="onClick" :size="'big'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
              <td>
                <v-button @mouseenter="onEnter" :skin="'secondary'" :size="'big'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
              <td>
                <v-button @focus="onFocus" :skin="'tertiary'" :size="'big'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
              <td>
                <v-button @blur="onBlur" :skin="'quaternary'" :size="'big'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
                </v-button>
              </td>
              <td>
                <v-button @mouseleave="onLeave" :skin="'ghost'" :size="'big'">
                  <template slot="default">Button Label</template>
                  <svg class="v-svg-icon" slot="iconAfter"><use xlink:href="img/icons.svg#icon-action"></use></svg>
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
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Success</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Normal</th>
              <td><v-button @click="onClick" :skin="'success'">Button Label</v-button></td>
              <td><v-button @click="onClick" :skin="'error'">Button Label</v-button></td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td><v-button @click="onClick" :skin="'success'" :size="'big'">Button Label</v-button></td>
              <td><v-button @click="onClick" :skin="'error'" :size="'big'">Button Label</v-button></td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }))
  .add('social', () => ({
    methods,
    components: { VButton },
    template: `
      <theme-provider>
        <table>
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
                <v-button @click="onClick" :skin="'social'" style="width: 181px;">
                  <svg style="margin-right: 5px;" class="v-svg-icon" slot="iconBefore"><use xlink:href="img/icons.svg#icon-google"></use></svg>
                  <template slot="default">Google</template>
                </v-button>
              </td>
              <td>
                <v-button @click="onClick" :skin="'social'" style="width: 181px;">
                  <svg style="margin-right: 5px;" class="v-svg-icon" slot="iconBefore"><use xlink:href="img/icons.svg#icon-github"></use></svg>
                  <template slot="default">GitHub</template>
                </v-button>
              </td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td>
                <v-button @click="onClick" :skin="'social'" :size="'big'" style="width: 181px;">
                  <svg style="margin-right: 5px;" class="v-svg-icon" slot="iconBefore"><use xlink:href="img/icons.svg#icon-google"></use></svg>
                  <template slot="default">Google</template>
                </v-button>
                </td>
              <td>
                <v-button @click="onClick" :skin="'social'" :size="'big'" style="width: 181px;">
                  <svg style="margin-right: 5px;" class="v-svg-icon" slot="iconBefore"><use xlink:href="img/icons.svg#icon-github"></use></svg>
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
        <table>
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
              <td><v-button disabled @mouseenter="onEnter" :skin="'secondary'">Button Label</v-button></td>
              <td><v-button disabled @focus="onFocus" :skin="'tertiary'">Button Label</v-button></td>
              <td><v-button disabled @blur="onBlur" :skin="'quaternary'">Button Label</v-button></td>
              <td><v-button disabled @mouseleave="onLeave" :skin="'ghost'">Button Label</v-button></td>
            </tr>
            <tr>
              <th scope="row">Big</th>
              <td><v-button disabled @click="onClick" :size="'big'">Button Label</v-button></td>
              <td><v-button disabled @mouseenter="onEnter" :skin="'secondary'" :size="'big'">Button Label</v-button></td>
              <td><v-button disabled @focus="onFocus" :skin="'tertiary'" :size="'big'">Button Label</v-button></td>
              <td><v-button disabled @blur="onBlur" :skin="'quaternary'" :size="'big'">Button Label</v-button></td>
              <td><v-button disabled @mouseleave="onLeave" :skin="'ghost'" :size="'big'">Button Label</v-button></td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
  }));

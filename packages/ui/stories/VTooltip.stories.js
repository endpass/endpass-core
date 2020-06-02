import { storiesOf } from '@storybook/vue';
import VTooltip from '@/kit/VTooltip';
import VHover from '@/kit/VHover';

const Child = {
  name: 'Child',
  template: `
    <div style="padding: 20px; background: silver;">
      move mouse to this place
    </div>
  `,
};
const Container = {
  components: { VHover },
  name: 'Container',
  data() {
    return {
      showTooltip: false,
    };
  },
  template: `
    <div>
      <div>top container</div>
      <v-hover style="width: 120px;" v-slot:default="{ isHover }">
        <slot v-bind:showTooltip="isHover"/>
      </v-hover>
      <div>bottom container</div>
    </div>
  `,
};

storiesOf('VTooltip/desktop', module)
  .add('default', () => ({
    components: { VTooltip, Container, Child },
    template: `
    <theme-provider>
      <table>
        <tr>
          <td>
            <Container>
              <template v-slot:default="{ showTooltip }">
                <Child/>
                <VTooltip :show="showTooltip">
                  position: top-left
                </VTooltip>
              </template>
            </Container>
          </td>
          <td>
            <Container>
              <template v-slot:default="{ showTooltip }">
                <Child/>
                <VTooltip
                  position="top-right"
                  :show="showTooltip"
                >
                  position: top-right
                </VTooltip>
              </template>
            </Container>
          </td>
        </tr>
        <tr>
          <td>
            <Container>
              <template v-slot:default="{ showTooltip }">
                <VTooltip
                  position="bottom-left"
                  :show="showTooltip"
                >
                  position: bottom-left
                </VTooltip>
                <Child/>
              </template>
            </Container>
          </td>
          <td>
            <Container>
              <template v-slot:default="{ showTooltip }">
                <VTooltip
                  position="bottom-right"
                  :show="showTooltip"
                >
                  position: bottom-right
                </VTooltip>
                <Child/>
              </template>
            </Container>
          </td>
        </tr>
      </table>
    </theme-provider>
  `,
  }))
  .add('custom width', () => ({
    components: { VTooltip, Container, Child },
    template: `
    <theme-provider>
      <table>
        <tr>
          <td>
            <Container>
              <template v-slot:default="{ showTooltip }">
                <Child/>
                <VTooltip :show="showTooltip" :width="360">
                  position: top-left
                </VTooltip>
              </template>
            </Container>
          </td>
          <td>
            <Container>
              <template v-slot:default="{ showTooltip }">
                <Child/>
                <VTooltip
                  position="top-right"
                  :show="showTooltip"
                  :width="360"
                >
                  position: top-right
                </VTooltip>
              </template>
            </Container>
          </td>
        </tr>
        <tr>
          <td>
            <Container>
              <template v-slot:default="{ showTooltip }">
                <VTooltip
                  position="bottom-left"
                  :show="showTooltip"
                  :width="360"
                >
                  position: bottom-left
                </VTooltip>
                <Child/>
              </template>
            </Container>
          </td>
          <td>
            <Container>
              <template v-slot:default="{ showTooltip }">
                <VTooltip
                  position="bottom-right"
                  :show="showTooltip"
                  :width="360"
                >
                  position: bottom-right
                </VTooltip>
                <Child/>
              </template>
            </Container>
          </td>
        </tr>
      </table>
    </theme-provider>
  `,
  }));

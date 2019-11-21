import { storiesOf } from '@storybook/vue';
import VAccordion from '@/kit/VAccordion';
import VAccordionItem from '@/kit/VAccordion/VAccordionItem';

storiesOf('VAccordion/desktop', module)
  .add('default', () => ({
    components: { VAccordion, VAccordionItem },
    template: `
      <theme-provider>
        <v-accordion class="custom-accordion-class">
          <v-accordion-item class="custom-item-class">
            <template v-slot:title>Item #1</template>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </v-accordion-item>
          <v-accordion-item class="custom-item-class">
            <template v-slot:title>Item #2</template>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-accordion-item>
          <v-accordion-item class="custom-item-class">
            <template v-slot:title>Item #3</template>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-accordion-item>
        </v-accordion>

        <v-accordion>
          <v-accordion-item>
            <template v-slot:title>Item #1</template>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </v-accordion-item>
          <v-accordion-item>
            <template v-slot:title>Item #2</template>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-accordion-item>
          <v-accordion-item>
            <template v-slot:title>Item #3</template>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-accordion-item>
        </v-accordion>

        <v-accordion>
          <v-accordion-item>
            <template v-slot:title>Item #1</template>
            <template v-slot:default="{ instance }">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.

              <button @click="instance.open">Open</button>
              <button @click="instance.close">Close</button>
            </template>
          </v-accordion-item>
        </v-accordion>

        <v-accordion>
          <v-accordion-item :hideIcon="true">
            <template v-slot:title>Without icon</template>
            <template v-slot:default="{ instance }">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.

              <button @click="instance.open">Open</button>
              <button @click="instance.close">Close</button>
            </template>
          </v-accordion-item>
        </v-accordion>
      </theme-provider>
    `,
  }));
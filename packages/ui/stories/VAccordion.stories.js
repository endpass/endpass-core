import { storiesOf } from '@storybook/vue';
import VAccordion from '@/kit/VAccordion';
import VAccordionItem from '@/kit/VAccordion/VAccordionItem';

storiesOf('VAccordion/desktop', module)
  .add('default', () => ({
    components: { VAccordion, VAccordionItem },
    template: `
      <theme-provider>
        <v-accordion>
          <v-accordion-item>
            <template v-slot:title>Item #1</template>

            <template v-slot:content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </template>
          </v-accordion-item>

          <v-accordion-item>
            <template v-slot:title>Item #2</template>

            <template v-slot:content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </template>
          </v-accordion-item>

          <v-accordion-item>
            <template v-slot:title>Item #3</template>

            <template v-slot:content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </template>
          </v-accordion-item>
        </v-accordion>
      </theme-provider>
    `,
  }));
---
to: stories/<%= name %>.stories.js
---
import { storiesOf } from '@storybook/vue';
import <%= name %> from '@/kit/<%= name %>';

storiesOf('<%= name %>/desktop', module)
  .add('default', () => ({
    components: { <%= name %> },
    template: `
      <theme-provider>
        <<%= h.changeCase.paramCase(name) %> />
      </theme-provider>
    `,
  }));

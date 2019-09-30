import { storiesOf } from '@storybook/vue';

storiesOf('Typography', module).add('default', () => ({
  template: `
      <theme-provider>
        <h1 class="v-h1">H1 Title</h1>
        <h2 class="v-h2">H2 Title</h2>
        <h3 class="v-h3">H3 Title</h3>
        <h4 class="v-h4">H4 Title</h4>
        <h4 class="v-h4 is-bold">H4 Bold Title</h4>
        <p class="v-body">Plain body text</p>
        <p class="v-body is-small">Small body body text</p>
        <p class="v-small">Small text</p>
        <p class="v-tiny">Tiny text</p>
        <div class="theme-default">
          <p class="v-text-size-12">Text size 12</p>
          <p class="v-text-size-14">Text size 14</p>
          <p class="v-text-size-16">Text size 16</p>
        </div>
      </theme-provider>
    `,
}));

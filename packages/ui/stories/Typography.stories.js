import { storiesOf } from '@storybook/vue';

storiesOf('Typography', module).add('default', () => ({
  template: `      
      <theme-provider class="theme-default">      
        <table width="100%">
          <thead>
            <tr>
              <th>H</th>
              <th>Text</th>
              <th>Font size</th>
              <th>Line height</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h1 class="v-h1">H1 Title</h1>
                <h2 class="v-h2">H2 Title</h2>
                <h3 class="v-h3">H3 Title</h3>
                <h4 class="v-h4">H4 Title</h4>
                <h4 class="v-h4 is-bold">H4 Bold Title</h4>
              </td>
              <td>
                <p class="v-body">Plain body text</p>
                <p class="v-body is-small">Small body body text</p>
                <p class="v-small">Small text</p>
                <p class="v-tiny">Tiny text</p>
                <p class="v-text-center">center text</p>
                <p >text <span class="v-fw-b">strong</span> text</p>
              </td>
              <td>
                <p class="v-fs-12">Font size 12</p>
                <p class="v-fs-14">Font size 14</p>
                <p class="v-fs-16">Font size 16</p>
              </td>
              <td>
                <p class="v-lh-1">line height 1<br/>next line</p>
                <p class="v-lh-1-2">line height 1.2<br/>next line</p>
                <p class="v-lh-1-3">line height 1.3<br/>next line</p>
                <p class="v-lh-1-4">line height 1.4<br/>next line</p>
                <p class="v-lh-1-5">line height 1.5<br/>next line</p>
              </td>
            </tr>
          </tbody>
        </table>
      </theme-provider>
    `,
}));

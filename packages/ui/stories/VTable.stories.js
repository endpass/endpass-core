import { storiesOf } from '@storybook/vue';
import VTable, {
  VTableRow,
  VTableCell,
  VTableHead,
  VTableBody,
  VTableHeadCell,
  VTableContainer,
} from '@/kit/VTable';

storiesOf('VTable/desktop', module)
  .add('skin-grey(default)', () => ({
    components: {
      VTable,
      VTableRow,
      VTableCell,
      VTableHead,
      VTableBody,
      VTableHeadCell,
    },
    data() {
      return {
        rows: new Array(10),
      };
    },
    template: `
      <theme-provider>
        <v-table>
          <v-table-head>
            <v-table-row>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
            </v-table-row>
          </v-table-head>
          <v-table-body>
            <v-table-row
              v-for="(row, index) in rows"
              :key="index"
            >
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
            </v-table-row>
          </v-table-body>
        </v-table>
      </theme-provider>
    `,
  }))
  .add('skin-none', () => ({
    components: {
      VTable,
      VTableRow,
      VTableCell,
      VTableHead,
      VTableBody,
      VTableHeadCell,
    },
    data() {
      return {
        rows: new Array(10),
      };
    },
    template: `
      <theme-provider>
        <v-table>
          <v-table-head skin="none">
            <v-table-row>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
              <v-table-head-cell>Column header</v-table-head-cell>
            </v-table-row>
          </v-table-head>
          <v-table-body>
            <v-table-row
              v-for="(row, index) in rows"
              :key="index"
            >
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
            </v-table-row>
          </v-table-body>
        </v-table>
      </theme-provider>
    `,
  }))
  .add('without-header', () => ({
    components: {
      VTable,
      VTableRow,
      VTableCell,
      VTableHead,
      VTableBody,
      VTableHeadCell,
    },
    data() {
      return {
        rows: new Array(10),
      };
    },
    template: `
      <theme-provider>
        <v-table>         
          <v-table-body>
            <v-table-row
              v-for="(row, index) in rows"
              :key="index"
            >
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
              <v-table-cell>cell text</v-table-cell>
            </v-table-row>
          </v-table-body>
        </v-table>
      </theme-provider>
    `,
  }))
  .add('with-container', () => ({
    components: {
      VTable,
      VTableRow,
      VTableCell,
      VTableHead,
      VTableBody,
      VTableHeadCell,
      VTableContainer,
    },
    data() {
      return {
        rows: new Array(10),
      };
    },
    template: `
      <theme-provider>
        <div style="padding: 10px; background: white;">       
          <v-table-container>     
            <v-table>
              <v-table-head>
                <v-table-row>
                  <v-table-head-cell>Column header</v-table-head-cell>
                  <v-table-head-cell>Column header</v-table-head-cell>
                  <v-table-head-cell>Column header</v-table-head-cell>
                  <v-table-head-cell>Column header</v-table-head-cell>
                  <v-table-head-cell>Column header</v-table-head-cell>
                  <v-table-head-cell>Column header</v-table-head-cell>
                </v-table-row>
              </v-table-head>         
              <v-table-body>
                <v-table-row
                  v-for="(row, index) in rows"
                  :key="index"
                >
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                </v-table-row>
              </v-table-body>
            </v-table>
          </v-table-container>
        </div>
      </theme-provider>
    `,
  }))
  .add('with-container(no-header)', () => ({
    components: {
      VTable,
      VTableRow,
      VTableCell,
      VTableHead,
      VTableBody,
      VTableHeadCell,
      VTableContainer,
    },
    data() {
      return {
        rows: new Array(10),
      };
    },
    template: `
      <theme-provider>
        <div style="padding: 10px; background: white;">       
          <v-table-container>     
            <v-table>                       
              <v-table-body>
                <v-table-row
                  v-for="(row, index) in rows"
                  :key="index"
                >
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                  <v-table-cell>cell text</v-table-cell>
                </v-table-row>
              </v-table-body>
            </v-table>
          </v-table-container>
        </div>
      </theme-provider>
    `,
  }));

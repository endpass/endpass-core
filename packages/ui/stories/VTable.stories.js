import { storiesOf } from '@storybook/vue';
import VTable, {
  VTableRow,
  VTableCell,
  VTableHead,
  VTableBody,
  VTableHeadCell,
} from '@/kit/VTable';

storiesOf('VTable/desktop', module)
  .add('basic', () => ({
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
  }));

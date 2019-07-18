import { storiesOf } from '@storybook/vue';
import VTable, {
  VTableRow,
  VTableCell,
  VTableHead,
  VTableThead,
  VTableTbody,
} from '@/kit/VTable';

storiesOf('VTable/desktop', module)
  .add('basic', () => ({
    components: {
      VTable,
      VTableRow,
      VTableCell,
      VTableHead,
      VTableThead,
      VTableTbody,
    },
    data() {
      return {
        rows: new Array(10),
      };
    },
    template: `
      <theme-provider>
        <v-table>
          <v-table-thead>
            <v-table-row>
              <v-table-head>Column header</v-table-head>
              <v-table-head>Column header</v-table-head>
              <v-table-head>Column header</v-table-head>
              <v-table-head>Column header</v-table-head>
              <v-table-head>Column header</v-table-head>
              <v-table-head>Column header</v-table-head>
            </v-table-row>
          </v-table-thead>
          <v-table-tbody>
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
          </v-table-tbody>
        </v-table>
      </theme-provider>
    `,
  }));

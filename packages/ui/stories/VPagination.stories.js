import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VPagination from '@/kit/VPagination';

const methods = {
  onOffset: action('onOffset'),
};

storiesOf('VPagination/desktop', module)
  .add('default', () => ({
    components: { VPagination },
    data() {
      return {
        offset: 0,
        limit: 10,
      };
    },
    methods: {
      onOffset(offset) {
        methods.onOffset(offset);
        this.offset = offset;
      },
    },
    template: `
      <theme-provider>
        <v-pagination
          :offset="offset"
          :limit="limit"
          @offset="onOffset"
        />
        <p>offset: {{ offset }}</p>
      </theme-provider>
    `,
  }))
  .add('withoutTotal', () => ({
    components: { VPagination },
    data() {
      return {
        offset: 0,
        limit: 10,
        pagesVisible: 3,
      };
    },
    methods: {
      onOffset(offset) {
        methods.onOffset(offset);
        this.offset = offset;
      },
    },
    template: `
      <theme-provider>
        <v-pagination
          :offset="offset"
          :limit="limit"
          :pages-visible="pagesVisible"
          @offset="onOffset"
        />
        <p>offset: {{ offset }}</p>
      </theme-provider>
    `,
  }))
  .add('fullProps', () => ({
    components: { VPagination },
    data() {
      return {
        offset: 0,
        limit: 10,
        total: 100,
        pagesVisible: 3,
      };
    },
    methods: {
      onOffset(offset) {
        methods.onOffset(offset);
        this.offset = offset;
      },
    },
    template: `
      <theme-provider>
        <v-pagination
          :offset="offset"
          :limit="limit"
          :total="total"
          :pages-visible="pagesVisible"
          @offset="onOffset"
        />
        <p>offset: {{ offset }}</p>
      </theme-provider>
    `,
  }));

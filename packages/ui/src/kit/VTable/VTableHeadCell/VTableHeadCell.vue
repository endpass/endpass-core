<template>
  <th :class="vTableHeadCellCssClass">
    <a
      href="#"
      class="v-table-head-cell-sort-wrapper"
      @click.prevent="onClick"
    >
      <slot />
      <svg-atom
        v-if="isSortable"
        class="v-table-head-cell-sort-icon"
        :name="sortIcon"
        width="8"
        height="8"
      />
    </a>
  </th>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import SvgAtom from '@/atom/svg-atom/svg-atom';

const SORTING_DIRECTIONS = {
  DESC: 'desc',
  ASC: 'asc',
};

export default {
  name: 'VTableHeadCell',

  props: {
    sortingOn: {
      type: String,
      default: null,
    },

    sortingValue: {
      type: Object,
      default: () => ({
        name: null,
        direction: SORTING_DIRECTIONS.DESC,
      }),
    },
  },

  computed: {
    vTableHeadCellCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table-head-cell': true,
        'is-sortable': !!this.sortingOn,
      });
    },

    sortIcon() {
      if (this.sortingValue.direction === SORTING_DIRECTIONS.ASC) {
        return 'caret-up';
      }

      return 'caret-down';
    },

    isSortable() {
      return !!this.sortingOn && this.sortingOn === this.sortingValue.name;
    },

    newDirection() {
      const { name, direction } = this.sortingValue;

      if (name === this.sortingOn && direction === SORTING_DIRECTIONS.DESC) {
        return SORTING_DIRECTIONS.ASC;
      }

      return SORTING_DIRECTIONS.DESC;
    },
  },

  methods: {
    onClick() {
      if (!this.sortingOn) {
        return;
      }

      this.$emit('sorting', {
        name: this.sortingOn,
        direction: this.newDirection,
      });
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
  },
};
</script>

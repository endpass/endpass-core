<template>
  <div class="v-pagination">
    <div class="v-pagination-navigation">
      <span class="v-pagination-node">Page {{ currentPage }}</span>
      <a
        :disabled="!hasBack"
        class="v-pagination-node"
        data-test="pagination-prev"
        @click.prevent="goToPrev()"
      >
        <span class="v-pagination-triangle-left"/>
      </a>
      <a
        v-if="showFirstPage"
        class="v-pagination-node"
        data-test="btn-goto-first"
        @click.prevent="goToFirst()"
      >
        1
      </a>
      <a
        v-if="isShowFirstPageDots"
        class="v-pagination-node"
        data-test="dots-left"
        @click.prevent="goToFirst()"
      >...</a>

      <a
        class="v-pagination-node"
        v-for="num in allVisiblePages"
        data-test="btn-goto-page"
        @click.prevent="goToPage(num)"
      >
        {{ num }}
        <span 
          :class="{ 'v-pagination-active-foot': currentPage === num }" 
        />
      </a>

      <a
        v-if="showLastPageDots"
        class="v-pagination-node"
        data-test="dots-right"
        @click.prevent="goToLast()"
      >...</a>
      <a
        data-test="btn-goto-last"
        v-if="showLastPage"
        class="v-pagination-node"
        @click.prevent="goToLast()"
      >
        {{ totalPages }}
      </a>
      <a
        :disabled="!hasForward"
        class="v-pagination-node"
        data-test="pagination-next"
        @click.prevent="goToNext()"
      >
        <span class="v-pagination-triangle-right"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VPagination',
  props: {
    offset: {
      type: Number,
      required: true,
    },
    limit: {
      required: true,
      validator: (value) => {
        return !!value && Number(value) > 0; // 1+
      }
    },
    total: {
      type: Number,
      default: 0,
    },
    pagesVisible: {
      default: 0,
      validator: (value) => {
        return value === 0 || ((value % 2) === 1); // 0, 1, 3, 5 ...
      },
    },
  },
  computed: {
    currentPage() {
      return Math.floor(this.offset / this.limit) + 1;
    },
    halfPagesVisible() {
      return Math.floor(this.pagesVisible / 2);
    },
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },

    allVisiblePages() {
      // visible = 3
      // [[1], 2, 3] = []
      // [1, [2], 3] = [1]
      // [6, 7, [8]] = [6, 7]

      const startPointBefore = Math.max(1, this.currentPage - this.halfPagesVisible);

      const maxPages = this.totalPages
        ? this.totalPages + 1
        : this.currentPage + this.pagesVisible;

      const startPointByVisiblePages = Math.max(1, maxPages - this.pagesVisible);
      const startPoint = Math.min(startPointBefore, startPointByVisiblePages);
      const endPoint = Math.min(maxPages, startPoint + this.pagesVisible);

      const countTotalPages = endPoint - startPoint;

      return Array.from(Array(countTotalPages), (d, i) => {
        return startPoint + i;
      });
    },

    isInfinityPages() {
      return this.total === 0;
    },
    hasVisiblePages() {
      return !!this.pagesVisible;
    },
    hasBack() {
      return this.currentPage !== 1;
    },
    hasForward() {
      if (this.isInfinityPages) {
        return true; // infinity next
      }

      return this.totalPages > this.currentPage;
    },
    showFirstPage() {
      return this.hasVisiblePages && !this.allVisiblePages.includes(1);
    },
    isShowFirstPageDots(){
      return this.hasVisiblePages && !this.allVisiblePages.includes(2);
    },
    showLastPage() {
      return this.hasVisiblePages && this.total && !this.allVisiblePages.includes(this.totalPages);
    },
    showLastPageDots() {
      return this.hasVisiblePages &&
        (
          (!this.isInfinityPages && !this.allVisiblePages.includes(this.totalPages - 1)) ||
          this.isInfinityPages
        );
    }
  },
  methods: {
    goToFirst() {
      this.goToPage(1);
    },

    goToLast() {
      this.goToPage(this.totalPages);
    },

    goToPrev() {
      this.goToPage(this.currentPage - 1);
    },

    goToNext() {
      this.goToPage(this.currentPage + 1);
    },

    goToPage(pageNumber) {
      if (pageNumber > 0 && this.currentPage === pageNumber) {
        return;
      }

      const nextOffset = (pageNumber - 1) * this.limit;

      this.$emit('offset', nextOffset);
    },
  },
};
</script>

<style lang="scss">
  .v-pagination {
    display: flex;
  }

  .v-pagination-navigation {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  .v-pagination-node {
    position: relative;
    height: 48px;
    width: 48px;
    white-space: nowrap;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    padding: 12px;

    &[disabled="disabled"] {
      pointer-events: none;
      cursor: default;
      opacity: 0.3;
    }
  }

  .v-pagination-triangle-left {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 7px 5px 0;
    border-color: transparent #000000 transparent transparent;
  }

  .v-pagination-triangle-right {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 7px;
    border-color: transparent transparent transparent #000000;
  }

  .v-pagination-active-foot {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -8px;
    height: 4px;
    background-color: #6E32C9;
    width: 16px;
  }
</style>

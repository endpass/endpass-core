<template>
  <div
    class="v-pagination"
    :class="themeCssClass"
  >
    <div class="v-pagination-navigation">
      <span
        v-if="showCurrentPageTitle"
        class="v-pagination-node"
      >{{ title }} {{ currentPage }}</span>
      <a
        :disabled="!hasBack"
        class="v-pagination-node"
        data-test="pagination-prev"
        @click.prevent="goToPrev()"
      >
        <span class="v-pagination-triangle-left" />
      </a>
      <a
        v-if="showFirstPage"
        class="v-pagination-node"
        data-test="btn-goto-first"
        @click.prevent="goToFirst()"
      >
        1
      </a>
      <span
        v-if="isShowFirstPageDots"
        class="v-pagination-node"
        data-test="dots-left"
      >...</span>

      <a
        v-for="num in allVisiblePages"
        :key="num"
        class="v-pagination-node"
        data-test="btn-goto-page"
        :data-test-active="currentPage === num"
        @click.prevent="goToPage(num)"
      >
        {{ num }}
        <span 
          v-if="currentPage === num" 
          class="v-pagination-active-foot"
          data-test="active-page-indicator"
        />
      </a>

      <span
        v-if="showLastPageDots"
        class="v-pagination-node"
        data-test="dots-right"
      >...</span>
      <a
        v-if="showLastPage"
        data-test="btn-goto-last"
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
        <span class="v-pagination-triangle-right" />
      </a>
    </div>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VPagination',
  props: {
    title: {
      type: String,
      default: 'Page',
    },
    offset: {
      type: Number,
      required: true,
    },
    limit: {
      required: true,
      validator: value => !!value && Number(value) > 0, // 1+
    },
    total: {
      type: Number,
      default: 0,
    },
    pagesVisible: {
      default: 0,
      validator: value => value === 0 || value % 2 === 1, // 0, 1, 3, 5 ...
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

      const startPointBefore = Math.max(
        1,
        this.currentPage - this.halfPagesVisible,
      );

      const maxPages = this.totalPages
        ? this.totalPages + 1
        : this.currentPage + this.pagesVisible;

      const startPointByVisiblePages = Math.max(
        1,
        maxPages - this.pagesVisible,
      );
      const startPoint = Math.min(startPointBefore, startPointByVisiblePages);
      const endPoint = Math.min(maxPages, startPoint + this.pagesVisible);

      const countTotalPages = endPoint - startPoint;

      return Array.from(Array(countTotalPages), (d, i) => startPoint + i);
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
      if (!this.hasVisiblePages) {
        return false;
      }

      return !this.allVisiblePages.includes(1);
    },
    isShowFirstPageDots() {
      if (!this.hasVisiblePages) {
        return false;
      }

      if (this.allVisiblePages.includes(2)) {
        return false;
      }

      return this.currentPage > 2;
    },
    showLastPage() {
      if (!this.hasVisiblePages) {
        return false;
      }

      return (
        !this.isInfinityPages && !this.allVisiblePages.includes(this.totalPages)
      );
    },
    showLastPageDots() {
      if (!this.hasVisiblePages) {
        return false;
      }

      const nearPageNumber = this.totalPages - 1;
      if (this.allVisiblePages.includes(nearPageNumber)) {
        return false;
      }

      if (this.isInfinityPages) {
        return true;
      }

      return this.totalPages > 2;
    },
    showCurrentPageTitle() {
      return this.pagesVisible === 0;
    },
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
  mixins: [ThemeMixin],
};
</script>

<template>
  <div class="card-header">
    <a
      v-if="hasPrev"
      class="card-header-icon"
      data-test="pagination-prev"
      @click.prevent="changePage(-1)"
    >
      &lt; Back
    </a>
    <a
      v-if="hasNext"
      class="card-header-icon"
      data-test="pagination-next"
      @click.prevent="changePage(1)"
    >
      Next &gt;
    </a>
  </div>
</template>

<script>
export default {
  name: 'VPagination',
  props: {
    offset: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    hasPrev() {
      return this.offset > 0;
    },
    hasNext() {
      if (!this.total) {
        return true; // infinity next
      }

      return this.total > this.offset + this.limit;
    },
  },
  methods: {
    changePage(diff) {
      const nextOffset = Math.max(this.offset + this.limit * diff, 0);

      if (this.offset !== nextOffset) {
        this.$emit('offset', nextOffset);
      }
    },
  },
};
</script>

<style lang="scss"></style>

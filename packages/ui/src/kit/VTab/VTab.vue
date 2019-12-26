<template>
  <div v-if="id === activeTabId">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTab',

  inject: ['addTab', 'removeTab'],

  props: {
    id: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
  },

  computed: {
    activeTabId() {
      return this.$parent.activeTabId;
    },
  },

  mounted() {
    this.addTab(this);
  },

  beforeDestroy() {
    this.removeTab(this);
  },
};
</script>

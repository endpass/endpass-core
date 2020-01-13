<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTab',

  inject: ['addTab', 'removeTab'],

  props: {
    label: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false,
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

<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTab',

  inject: ['addTab', 'removeTab', 'setTabAsActive'],

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

  watch: {
    isActive(val, prevVal) {
      if (val && val !== prevVal) {
        this.setTabAsActive(this);
      }
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

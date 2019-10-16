<script>
export default {
  name: 'VTab',

  inject: ['addTab', 'removeTab'],

  props: {
    label: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.addTab(this);
  },

  beforeDestroy() {
    this.removeTab(this);
  },

  render() {
    return null;
  },
};
</script>

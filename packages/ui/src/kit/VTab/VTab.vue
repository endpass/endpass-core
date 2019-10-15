<script>
export default {
  name: 'VTab',

  inject: ['addTab'],

  props: {
    label: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.addTab(this);
  },

  render() {
    return null;
  },
};
</script>

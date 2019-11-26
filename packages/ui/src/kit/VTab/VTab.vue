<script>
export default {
  name: 'VTab',

  inject: ['addTab', 'removeTab', 'setActive'],

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

  methods: {
    updateActive() {
      if (this.isActive) {
        this.setActive(this);
      }
    },
  },

  mounted() {
    this.addTab(this);
    this.updateActive(this);
  },

  updated() {
    this.updateActive(this);
  },

  beforeDestroy() {
    this.removeTab(this);
  },

  render() {
    return null;
  },
};
</script>

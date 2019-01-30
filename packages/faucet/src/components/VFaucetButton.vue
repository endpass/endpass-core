<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :class="[...classes, {'is-loading' : loading }]"
    type="button"
    class="button"
    @click="sendData()"
    v-on="$listeners"
  >
    <slot/>
  </button>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'VFaucetButton',
    inheritAttrs: false,
    props: {
      className: {
        type: String,
        default: '',
      },
      faucetApi: {
        type: String,
        default: 'https://faucet.ropsten.be/donate',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      address: {
        type: String,
        default: '',
        required: true,
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    computed: {
      classes() {
        return this.className.split(' ');
      },
    },
    methods: {
      async sendData() {
        this.loading = true;
        try {
          this.$emit('before-send');
          const {data} = await axios({
            method: 'GET',
            url: `${this.faucetApi}/${this.address}`,
          });
          this.$emit('donate', data);
        } catch(error) {
          this.$emit('donate-error', error);
        } finally {
          this.loading = false;
        }
      }
    }
  };

</script>

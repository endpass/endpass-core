<template>
  <div>
    <slot
      :sendRequest="sendRequest"
      :isLoading="isLoading"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VFaucetButton',
  inheritAttrs: false,
  props: {
    faucetApi: {
      type: String,
      default: 'https://faucet.ropsten.be/donate',
    },
    address: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async sendRequest() {
      this.isLoading = true;
      try {
        this.$emit('before-send');
        const { data } = await axios({
          method: 'GET',
          url: `${this.faucetApi}/${this.address}`,
        });
        this.$emit('donate', data);
      } catch (error) {
        this.$emit('donate-error', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :class="[...classes, {'is-loading' : loading }]"
    class="button"
    v-on:click="sendData()"
  >
    <slot/>
  </button>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';

  const FaucetButton = {
    name: 'FaucetButton',
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
      sendData() {
        this.loading = true;
        axios({
          method: 'GET',
          url: `${this.faucetApi}/${this.address}`,
        }).then(result => {
          this.$emit('onLoad', result);
          this.loading = false;
          console.log(result);
        }).catch(error => {
          this.loading = false;
          console.error(error);
        });
      }
    }
  };

  Vue.component('vfaucet-button', FaucetButton);
  export default FaucetButton;
</script>

<style lang="scss">
</style>

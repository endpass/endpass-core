<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :class="[...classes, {'is-loading' : loading }]"
    class="button"
    @click="sendData()"
    v-on="$listeners"
  >
    <slot/>
  </button>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';

  const VFaucetButton = {
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
      sendData() {
        this.loading = true;
        // cli3 -> rollup
        axios({
          method: 'GET',
          url: `${this.faucetApi}/${this.address}`,
        }).then(result => {
          this.$emit('donate', result.data);
          this.loading = false;
          console.log(result.data);
        }).catch(error => {
          // this.$emit('donate', error);
          this.loading = false;
          console.error(error);
        });
      }
    }
  };

  Vue.component(VFaucetButton.name, VFaucetButton);
  export default VFaucetButton;
</script>

<style lang="scss">
</style>

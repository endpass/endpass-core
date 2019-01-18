<template>
  <div class="field">
    <div class="control">
      <button
        v-bind="$attrs"
        :disabled="disabled"
        :class="[...classes, {'is-loading' : loading }]"
        class="button"
        v-on:click="sendData()"
      >
        <slot/>
      </button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
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
          headers: {'content-type': 'application/json'}
        }).then(result => {
          this.loading = false;
          this.response = result.data;
        }).catch(error => {
          this.loading = false;
          console.error(error);
        });
      }
    }
  };
</script>

<style lang="scss">
</style>

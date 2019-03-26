<template>
  <svg
    v-if="iconUrl"
    :class="className"
    :width="width"
    :height="height"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :xlink:href="iconUrl" xmlns:xlink="http://www.w3.org/1999/xlink"/>
  </svg>
</template>

<script>
export default {
  name: 'VSvgIcon',
  props: {
    width: {
      type: String,
      default: '20px',
    },
    height: {
      type: String,
      default: '20px',
    },
    fill: {
      type: String,
      default: '',
    },
    iconPath: {
      validator(value) {
        return !!value.default;
      },
    },
  },
  data: () => ({
    className: 'v-svg-icon',
  }),
  computed: {
    iconUrl() {
      const url = ((this.iconPath || {}).default || {}).url || null;
      return url;
    },
  },
};
</script>
<style lang="postcss">
  .v-svg-icon {
    margin: 0 auto;
  }
</style>

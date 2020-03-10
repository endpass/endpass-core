<template>
  <div
    v-bind="$attrs"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    v-on="$listeners"
  >
    <slot :isHover="isHover" />
  </div>
</template>

<script>
export default {
  name: 'HoverAtom',

  inheritAttrs: false,

  data() {
    return {
      isHover: false,
    };
  },

  methods: {
    onMouseOver() {
      this.isHover = true;
    },

    onMouseLeave() {
      this.isHover = false;
    },
  },
};
</script>

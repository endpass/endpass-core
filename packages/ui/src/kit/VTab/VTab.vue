<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTab',

  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

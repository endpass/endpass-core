<template>
  <transition :name="`v-modal-${animation}`">
    <mask-atom @click="$emit('click', $event)">
      <slot />
    </mask-atom>
  </transition>
</template>

<script>
import MaskAtom from '@/atom/mask-atom/mask-atom';

export default {
  name: 'VModal',
  props: {
    animation: {
      type: String,
      default: 'fade',
      validator(value) {
        return ['fade'].indexOf(value) !== -1;
      },
    },
  },
  components: { MaskAtom },
};
</script>

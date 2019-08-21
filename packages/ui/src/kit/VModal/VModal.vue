<template>
  <transition :name="`v-modal-${animation}`">
    <close-by-key-atom @close="$emit('close', $event)">
      <mask-atom @click="$emit('click', $event)">
        <slot />
      </mask-atom>
    </close-by-key-atom>
  </transition>
</template>

<script>
import MaskAtom from '@/atom/mask-atom/mask-atom';
import CloseByKeyAtom from '@/atom/close-by-key-atom/close-by-key-atom';

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
  components: { CloseByKeyAtom, MaskAtom },
};
</script>

<template>
  <close-by-key-atom
    class="v-modal-card"
    :class="themeCssClass"
    @close="onClose"
  >
    <div class="v-modal-card-controls">
      <button
        v-if="isReturnable"
        class="v-modal-card-back"
        data-test="modal-card-button-back"
        @click="$emit('return', $event)"
        v-html="backSvgIcon"
      />
      <button
        v-if="isClosable"
        class="v-modal-card-close"
        data-test="modal-card-button-close"
        @click="onClose"
        v-html="closeSvgIcon"
      />
    </div>
    <header
      v-if="$slots.title"
      class="v-modal-card-header"
    >
      <h3 class="v-modal-card-title">
        <slot name="title" />
      </h3>
    </header>
    <div class="v-modal-card-body">
      <slot />
    </div>
  </close-by-key-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import closeSvgIcon from '@/img/close.svg';
import backSvgIcon from '@/img/arrowLeft.svg';
import CloseByKeyAtom from '@/atom/close-by-key-atom/close-by-key-atom';

export default {
  name: 'VModalCard',
  props: {
    isClosable: {
      type: Boolean,
      default: false,
    },
    isReturnable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      closeSvgIcon,
      backSvgIcon,
    };
  },
  methods: {
    onClose($event) {
      this.$emit('close', $event);
    },
  },
  mixins: [ThemeMixin],
  components: { CloseByKeyAtom },
};
</script>

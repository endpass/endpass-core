<template>
  <div
    class="v-modal-card"
    :class="themeCssClass"
  >
    <div class="v-modal-card-controls">
      <button
        v-if="isReturnable"
        class="v-modal-card-back"
        @click="$emit('return', $event)"
        v-html="backSvgIcon"
        data-test="modal-card-button-back"
      />
      <button
        v-if="isClosable"
        class="v-modal-card-close"
        @click="$emit('close', $event)"
        v-html="closeSvgIcon"
        data-test="modal-card-button-close"
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
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import closeSvgIcon from '@/img/close.svg';
import backSvgIcon from '@/img/arrowLeft.svg';

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
  mixins: [ThemeMixin],
};
</script>

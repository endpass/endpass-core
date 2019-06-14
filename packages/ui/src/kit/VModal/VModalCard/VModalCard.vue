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
      >
        <svg-atom
          width="23"
          height="17"
          view-box="0 0 23 17"
          fill="none"
          :href="backSvgHref"
        />
      </button>
      <button
        v-if="isClosable"
        class="v-modal-card-close"
        @click="$emit('close', $event)"
      >
        <svg-atom
          width="17"
          height="17"
          view-box="0 0 17 17"
          fill="none"
          :href="closeSvgHref"
        />
      </button>
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
import SvgAtom from '@/atom/svg-atom/svg-atom';

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
    closeSvgHref: {
      type: String,
      default: 'img/icons.svg#icon-close',
    },
    backSvgHref: {
      type: String,
      default: 'img/icons.svg#icon-arrow-left',
    },
  },
  mixins: [ThemeMixin],
  components: { SvgAtom },
};
</script>

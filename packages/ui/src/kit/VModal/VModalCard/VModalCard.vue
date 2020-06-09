<template>
  <close-by-key-atom
    :stop-propagation-elements="['input', 'textarea']"
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
      >
        <svg-atom
          name="arrow-left"
          width="23px"
          height="17px"
        />
      </button>
      <button
        v-if="isClosable"
        class="v-modal-card-close"
        data-test="modal-card-button-close"
        @click="onClose"
      >
        <svg-atom
          name="close"
          width="17px"
          height="17px"
        />
      </button>
    </div>
    <header
      v-if="$slots.title || $slots.icon || $slots.description"
      class="v-modal-card-header"
    >
      <div
        v-if="$slots.icon"
        class="v-modal-card-icon"
      >
        <slot name="icon" />
      </div>
      <h3
        v-if="$slots.title"
        class="v-modal-card-title"
      >
        <slot name="title" />
      </h3>
      <div
        v-if="$slots.description"
        class="v-modal-card-description"
      >
        <slot name="description" />
      </div>
    </header>
    <div class="v-modal-card-body">
      <slot />
    </div>
  </close-by-key-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import CloseByKeyAtom from '@/atom/close-by-key-atom/close-by-key-atom';
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
  },

  methods: {
    onClose($event) {
      this.$emit('close', $event);
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
    CloseByKeyAtom,
  },
};
</script>

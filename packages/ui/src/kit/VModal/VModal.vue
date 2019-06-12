<template>
  <transition name="v-modal">
    <div
      class="v-modal-mask"
      :class="themeCssClass"
      @click="$emit('close')"
    >
      <aside
        v-if="$slots.aside"
        class="v-modal-aside"
      >
        <slot name="aside" />
      </aside>
      <div
        class="v-modal-container"
        @click.stop=""
      >
        <div class="v-modal-controls">
          <button
            v-if="isReturnable"
            class="v-modal-back"
            @click="$emit('return')"
          >
            <svg-atom
              width="23"
              height="17"
              view-box="0 0 23 17"
              fill="none"
              :url="'img/icons.svg#icon-arrow-left'"
            />
          </button>
          <button
            v-if="isClosable"
            class="v-modal-close"
            @click="$emit('close')"
          >
            <svg-atom
              width="17"
              height="17"
              view-box="0 0 17 17"
              fill="none"
              :url="'img/icons.svg#icon-close'"
            />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import SvgAtom from '@/atom/svg-atom/svg-atom';

export default {
  name: 'VModal',
  props: {
    isClosable: {
      type: Boolean,
      default: true,
    },
    isReturnable: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [ThemeMixin],
  components: { SvgAtom },
};
</script>

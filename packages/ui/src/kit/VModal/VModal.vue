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
            <svg
              width="23"
              height="17"
              viewBox="0 0 23 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5 8.5H1.5"
                stroke="#111111"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.5 15.5L1.5 8.5L8.5 1.5"
                stroke="#111111"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            v-if="isClosable"
            class="v-modal-close"
            @click="$emit('close')"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 1.5L1.5 15.5"
                stroke="#242A2E"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5 15.5L1.5 1.5"
                stroke="#242A2E"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <header
          v-if="$slots.title"
          class="v-modal-header"
        >
          <h3 class="v-modal-title">
            <slot name="title" />
          </h3>
        </header>
        <main class="v-modal-body">
          <slot />
        </main>
        <footer v-if="$slots.footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

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
};
</script>

<template>
  <div
    :tabindex="0"
    :class="itemClassName"

    @click="handleClick"
  >
    <div class="accordion-header">
      <div class="accordion-title">
        <slot name="item"></slot>
      </div>

      <v-icon-button
        :icon="icon"
        :width="20"

        class="accordion-item-icon"
      ></v-icon-button>
    </div>

    <div class="accordion-content" v-show="isOpened">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import VIconButton from '@endpass/ui/kit/VIconButton';

export default {
  name: 'VAccordionItem',

  data: () => ({
    isOpened: false,
  }),

  props: {
    className: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleClick() {
      this.isOpened = !this.isOpened;

      this.$emit('click');
    },
  },

  computed: {
    icon() {
      return this.isOpened ? 'chevron-up' : 'chevron-down';
    },

    itemClassName() {
      return `v-accordion-item ${this.className || ''}`;
    }
  },

  components: {
    VIconButton,
  },
};
</script>

<template>
  <div
    :tabindex="0"
    :class="itemClassName"

    @click="handleClick"
  >
    <slot>
      <div class="accordion-header">
        <div class="accordion-title">
          <slot name="title"></slot>
        </div>

        <v-icon-button
          :icon="icon"
          width="20"

          class="accordion-item-icon"
        ></v-icon-button>
      </div>

      <div class="accordion-content" v-show="isOpened">
        <slot name="content"></slot>
      </div>
    </slot>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
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
    },
  },

  mixins: [ThemeMixin],

  components: {
    VIconButton,
  },
};
</script>

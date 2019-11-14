<template>
  <div
    :tabindex="0"
    :class="itemClassName"

    @click="handleClick"
  >
    <slot>
      <div class="accordion-header">
        <div class="accordion-title">
          <slot name="title" />
        </div>

        <v-icon-button
          :icon="icon"
          width="20"

          class="accordion-item-icon"
        />
      </div>

      <div
        v-show="isOpened"
        class="accordion-content"
      >
        <slot name="content" />
      </div>
    </slot>
  </div>
</template>

<script>
import VIconButton from '@endpass/ui/kit/VIconButton';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VAccordionItem',

  props: {
    className: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    isOpened: false,
  }),

  computed: {
    icon() {
      return this.isOpened ? 'chevron-up' : 'chevron-down';
    },

    itemClassName() {
      return `v-accordion-item ${this.className || ''}`;
    },
  },

  methods: {
    handleClick() {
      this.isOpened = !this.isOpened;

      this.$emit('click');
    },
  },

  mixins: [ThemeMixin],

  components: {
    VIconButton,
  },
};
</script>

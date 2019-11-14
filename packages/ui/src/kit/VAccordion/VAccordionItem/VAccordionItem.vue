<template>
  <div
    :tabindex="0"
    :class="itemClassName"
    @click="onClick"
  >
    <div class="v-accordion-header">
      <div class="v-accordion-title">
        <slot name="title" />
      </div>
      <icon-button-atom
        :icon="icon"
        width="20"
        class="v-accordion-item-icon"
      />
    </div>
    <div
      v-show="isOpened"
      class="v-accordion-content"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import IconButtonAtom from '@/atom/icon-button-atom/icon-button-atom.vue';
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
    onClick() {
      this.isOpened = !this.isOpened;

      this.$emit('click');
    },
  },
  mixins: [ThemeMixin],
  components: {
    IconButtonAtom,
  },
};
</script>

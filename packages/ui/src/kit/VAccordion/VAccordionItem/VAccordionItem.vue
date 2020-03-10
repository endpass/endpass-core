<template>
  <div
    :tabindex="0"
    class="v-accordion-item"
    :class="themeCssClass"
    :data-opened="isOpened"
  >
    <div
      class="v-accordion-header"
      @click="onClick"
    >
      <div class="v-accordion-title">
        <slot name="title" />
      </div>
      <icon-button-atom
        v-if="!hideIcon"
        :icon="icon"
        width="20"
        class="v-accordion-item-icon"
        tabindex="-1"
      />
    </div>
    <div
      v-show="isOpened"
      class="v-accordion-content"
    >
      <slot
        :open="open"
        :close="close"
      />
    </div>
  </div>
</template>

<script>
import IconButtonAtom from '@/molecule/icon-button-molecule/icon-button-molecule.vue';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VAccordionItem',
  props: {
    hideIcon: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isOpened: false,
  }),
  computed: {
    icon() {
      return this.isOpened ? 'chevron-up' : 'chevron-down';
    },
  },
  methods: {
    onClick() {
      this.isOpened = !this.isOpened;

      this.$emit('click');
    },
    open() {
      this.isOpened = true;
    },
    close() {
      this.isOpened = false;
    },
  },
  mixins: [ThemeMixin],
  components: {
    IconButtonAtom,
  },
};
</script>

<template>
  <div :class="accordionClassName">
    <v-accordion-item
      v-for="(item, index) in items"
      :key="item.id"

      :class="classNames.item"
    >
      <template v-slot:item>
        <slot name="item" v-bind:item="item"></slot>
      </template>

      <template v-slot:content>
        <slot name="content" v-bind:item="item"></slot>
      </template>
    </v-accordion-item>
  </div>
</template>

<script>
import VAccordionItem from './VAccordionItem.vue';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VAccordion',

  props: {
    items: Array,
    classNames: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    icon() {
      return this.isOpened ? 'chevron-up' : 'chevron-down';
    },

    accordionClassName() {
      return `v-accordion ${this.classNames.accordion || ''}`;
    },
  },

  mixins: [ThemeMixin],

  components: {
    VAccordionItem,
  },
};
</script>

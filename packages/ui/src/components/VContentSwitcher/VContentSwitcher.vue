<template>
  <ul
    class="v-content-switcher"
    :class="themeCssClass"
  >
    <li
      v-for="(item, index) in transformedItems"
      :key="index"
      class="v-content-switcher-item"
      :class="{
        'is-focused': focusedItem === item,
        'is-checked': modelValue === item.value,
      }"
    >
      <label class="v-content-switcher-label">
        {{ item.label }}
        <input
          type="radio"
          :checked="modelValue === item.value"
          :value="item.value"
          class="v-content-switcher-control"
          @change="$emit('change', item.value)"
          @focus="focusedItem = item"
          @blur="focusedItem = null"
        >
      </label>
    </li>
  </ul>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VContentSwitcher',
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    modelValue: {
      type: null,
      default: false,
    },
  },
  data() {
    return {
      focusedItem: null,
    };
  },
  computed: {
    transformedItems() {
      return this.items.map((item) => {
        if (typeof item === 'string') {
          return { label: item, value: item };
        }
        if (!item || typeof item !== 'object') {
          throw new Error('VContentSwitcher item wrong type!');
        }
        if (item.value === undefined || item.label === undefined) {
          throw new Error('VContentSwitcher item wrong format!');
        }
        return item;
      });
    },
  },
  mixins: [ThemeMixin],
  model: {
    prop: 'modelValue',
    event: 'change',
  },
};
</script>

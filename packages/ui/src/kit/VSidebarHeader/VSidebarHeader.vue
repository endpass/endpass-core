<template>
  <div
    class="v-sidebar-header"
    :class="themeCssClass"
  >
    <div
      v-if="hasTitleSlot || hasDefaultSlot"
      class="v-sidebar-header-content"
    >
      <h3 v-if="hasTitleSlot">
        <slot name="title" />
      </h3>
      <div
        v-if="hasDefaultSlot"
        class="v-sidebar-header-subtitle"
      >
        <slot />
      </div>
    </div>
    <button
      class="v-sidebar-close"
      @click="$emit('close', $event)"
    >
      <svg-atom name="close" />
    </button>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import SvgAtom from '@/atom/svg-atom/svg-atom';

export default {
  name: 'VSidebarHeader',
  computed: {
    hasTitleSlot() {
      return !!this.$slots.title;
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
  },
  mixins: [ThemeMixin],
  components: { SvgAtom },
};
</script>

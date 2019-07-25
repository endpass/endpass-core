<template>
  <field-atom
    class="v-progress-circle"
    :class="themeCssClass"
  >
    <svg class="v-progress-circle-back">
      <circle />
    </svg>
    <svg
      class="v-progress-circle-over"
      :style="{ strokeDasharray: strokeDasharray }"
    >
      <circle />
    </svg>
  </field-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import FieldAtom from '@/atom/field-atom/field-atom';

const SIZE_DEFAULT_STROKE = 188.4;

export default {
  name: 'VProgressCircle',
  props: {
    progress: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    strokeDasharray() {
      const toStroke = Math.floor(
        (this.progress - 0) * (SIZE_DEFAULT_STROKE / 100),
      );
      return `${toStroke}, ${SIZE_DEFAULT_STROKE}`;
    },
  },
  mixins: [ThemeMixin],
  components: {
    FieldAtom,
  },
};
</script>

<template>
  <time :class="vDateBadgeCssClass">
    {{ formattedDateString }}
  </time>
</template>

<script>
import dayjs from 'dayjs';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VDateBadge',

  props: {
    date: {
      type: [String, Date, Number],
      required: true,
    },
  },

  computed: {
    vDateBadgeCssClass() {
      return { ...this.themeCssClass, 'v-date-badge': true };
    },

    formattedDateString() {
      return dayjs(this.date).format('YYYY-MM-DD H:mm');
    },
  },

  mixins: [ThemeMixin],
};
</script>

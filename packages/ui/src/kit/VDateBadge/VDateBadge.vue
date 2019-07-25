<template>
  <time :class="vDateBadgeCssClass">
    {{ formattedDateString }}
  </time>
</template>

<script>
import { formateDate } from '@endpass/utils/date';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VDateBadge',

  props: {
    date: {
      type: [String, Date],
      required: true,
    },
  },

  computed: {
    vDateBadgeCssClass() {
      return Object.assign({}, this.themeCssClass, {
        'v-date-badge': true,
      });
    },

    formattedDateString() {
      return formateDate(this.date);
    },
  },

  mixins: [ThemeMixin],
};
</script>

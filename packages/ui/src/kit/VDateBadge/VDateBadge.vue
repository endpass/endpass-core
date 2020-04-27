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

    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    vDateBadgeCssClass() {
      return {
        ...this.themeCssClass,
        'v-date-badge': true,
        [this.skin]: !!this.skin,
      };
    },

    formattedDateString() {
      return dayjs(this.date).format('YYYY-MM-DD H:mm');
    },
  },

  mixins: [ThemeMixin],
};
</script>

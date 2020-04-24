<template>
  <a
    :class="controlCssClass"
    :href="href"
    :role="controlRole"
    @click="emitClick"
  >
    <span class="icon-control-molecule-icon">
      <svg-atom
        v-if="!isIconSlotFilled"
        :name="icon"
      />
      <slot name="icon" />
    </span>
    <span class="icon-control-molecule-label">
      <slot />
    </span>
  </a>
</template>

<script>
import SvgAtom from '@/atom/svg-atom/svg-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'IconControlAtom',

  props: {
    href: {
      type: String,
      default: null,
    },

    icon: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: false,
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
    controlCssClass() {
      return Object.assign(this.themeCssClass, {
        'icon-control-molecule': true,
        'is-active': this.isActive,
        [this.skin]: !!this.skin,
      });
    },

    controlRole() {
      return this.href ? null : 'button';
    },

    isIconSlotFilled() {
      return !!this.$slots.icon;
    },
  },

  methods: {
    emitClick() {
      this.$emit('click');
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
  },
};
</script>

<template>
  <div
    class="v-tag"
    :class="tagCssClass"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
    <icon-atom
      v-if="isClosable"
      class="v-tag-close"
    >
      <svg-atom name="close" />
    </icon-atom>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import IconAtom from '@/atom/icon-atom/icon-atom';
import SvgAtom from '@/atom/svg-atom/svg-atom';

export default {
  name: 'VTag',

  inheritAttrs: false,

  props: {
    isClosable: {
      type: Boolean,
      default: false,
    },
    skin: {
      type: String,
      default: 'default',
      validator(value) {
        return (
          [
            'default',
            'cyan',
            'red',
            'magenta',
            'purple',
            'blue',
            'teal',
            'green',
            'gray',
            'light-gray',
            'dark-gray',
            'white',
            'success',
            'error',
          ].indexOf(value) !== -1
        );
      },
    },
  },

  computed: {
    tagCssClass() {
      return {
        ...this.themeCssClass,
        'is-closable': this.isClosable,
        [`skin-${this.skin}`]: true,
      };
    },
  },

  mixins: [ThemeMixin],

  components: {
    IconAtom,
    SvgAtom,
  },
};
</script>

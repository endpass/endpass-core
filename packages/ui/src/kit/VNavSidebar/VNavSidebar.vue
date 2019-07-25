<template>
  <div :class="vNavSidebarCssClass">
    <v-sidebar
      :is-open="isOpen"
      direction="left"
    >
      <overlay-atom
        v-if="isOpen"
        slot="overlay"
        @click="emitClose"
      />
      <v-sidebar-container>
        <slot />
      </v-sidebar-container>
    </v-sidebar>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import VSidebar from '@/kit/VSidebar';
import OverlayAtom from '@/atom/overlay-atom/overlay-atom';
import VSidebarContainer from '@/kit/VSidebar/VSidebarContainer/VSidebarContainer';

export default {
  name: 'VNavSidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    vNavSidebarCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-nav-sidebar': true,
      });
    },
  },

  methods: {
    emitClose() {
      this.$emit('close');
    },
  },

  mixins: [ThemeMixin],
  components: {
    VSidebarContainer,
    OverlayAtom,
    VSidebar,
  },
};
</script>

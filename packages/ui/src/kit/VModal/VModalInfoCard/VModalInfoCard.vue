<template>
  <div
    class="v-modal-info-card"
    :class="themeCssClass"
  >
    <aside
      class="v-modal-info-card-aside"
      :style="{ backgroundImage: `url(${infoBackgroundImage})` }"
    >
      <slot name="info" />
    </aside>
    <v-modal-card
      :is-closable="isClosable"
      :is-returnable="isReturnable"
      :close-svg-href="closeSvgHref"
      :back-svg-href="backSvgHref"
      @close="$emit('close', $event)"
      @return="$emit('return', $event)"
    >
      <template slot="title">
        <slot name="title" />
      </template>
      <slot />
    </v-modal-card>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import VModalCard from '@/kit/VModal/VModalCard/VModalCard';

export default {
  name: 'VModalInfoCard',
  props: {
    isClosable: {
      type: Boolean,
      default: false,
    },
    isReturnable: {
      type: Boolean,
      default: false,
    },
    closeSvgHref: {
      type: String,
      default: 'img/icons.svg#icon-close',
    },
    backSvgHref: {
      type: String,
      default: 'img/icons.svg#icon-arrow-left',
    },
    infoBackgroundImage: {
      type: String,
      default: 'img/info_bg.png',
    },
  },
  mixins: [ThemeMixin],
  components: { VModalCard },
};
</script>

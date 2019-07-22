---
to: src/kit/<%= name %>/<%=name%>.vue
---
<template>
  <div :class="<%= h.changeCase.camelCase(name) %>CssClass">
    Component <%= name %> template
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: '<%= name %>',

  computed: {
    <%= h.changeCase.camelCase(name) %>CssClass() {
      return Object.assign({}, this.themeCssClass, {
        '<%= h.changeCase.paramCase(name) %>': true,
      });
    },
  },

  mixins: [ThemeMixin],
};
</script>

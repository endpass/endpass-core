---
to: src/atom/<%= name %>/<%=name%>.vue
---
<template>
  <div :class="<%= h.changeCase.camelCase(name) %>CssClass">
    Atom <%= name %> template
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: '<%= h.changeCase.pascalCase(name) %>',

  computed: {
    <%= h.changeCase.camelCase(name) %>CssClass() {
      return Object.assign(this.themeCssClass, {
        '<%= h.changeCase.paramCase(name) %>': true,
      });
    },
  },

  mixins: [ThemeMixin],
};
</script>

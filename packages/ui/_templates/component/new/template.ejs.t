---
to: src/kit/<%= name %>/<%=name%>.vue
---
<template>
  <div class="<%= h.changeCase.paramCase(name) %>">
    Component <%= name %> template
  </div>
</template>

<script>
export default {
  name: '<%= name %>',
};
</script>

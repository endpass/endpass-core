---
inject: true
to: src/scss/kit.theme-default.scss
after: // kit
eof_last: false
---
@import '@/kit/<%= name %>/<%= name %>.theme-default.scss';

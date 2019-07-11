---
inject: true
to: src/kit/index.js
after: // Components
eof_last: false
---
export { default as <%= name %> } from '@/kit/<%= name %>';

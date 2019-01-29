'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-373f7571.js');
var __chunk_3 = require('./chunk-114c8aa6.js');

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Loading indicator that covers the entire page
var script = {
  name: 'VPageLoader',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VPageLoader.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isLoading)?_c('div',{staticClass:"page-loader modal is-active",attrs:{"data-test":"page-loader"}},[_vm._m(0)]):_vm._e()};
var __vue_staticRenderFns__ = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"page-loader-logo"},[_c('img',{attrs:{"src":"/static/logo-dark.png","alt":"Endpass"}})]),_vm._v(" "),_c('div',{staticClass:"spinner"},[_c('div',{staticClass:"spinner-dot spinner-dot-1"}),_vm._v(" "),_c('div',{staticClass:"spinner-dot spinner-dot-2"}),_vm._v(" "),_c('div',{staticClass:"spinner-dot spinner-dot-3"})]),_vm._v(" "),_c('p',{staticClass:"spinner-caption"},[_vm._v("Loading...")])])}];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-a2b3eefc_0", { source: ".page-loader{color:#fff;background-color:#4b0472}.page-loader .page-loader-logo{margin:0 auto;text-align:center}.page-loader .page-loader-logo img{height:auto;width:auto;max-height:6rem}.page-loader .spinner-caption{text-align:center;margin:0 auto}.page-loader .spinner{margin:1rem auto 0;width:70px;text-align:center}.page-loader .spinner .spinner-dot{width:18px;height:18px;background-color:#fff;border-radius:100%;display:inline-block;animation:bouncedelay 1.4s infinite ease-in-out both}.page-loader .spinner .spinner-dot-1{animation-delay:-.32s}.page-loader .spinner .spinner-dot-2{animation-delay:-.16s}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VPageLoader = __chunk_1.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __chunk_3.createInjector,
    undefined
  );

exports.default = VPageLoader;

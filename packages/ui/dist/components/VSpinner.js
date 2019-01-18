import { a as normalizeComponent } from './chunk-80d3703e.js';
import { a as createInjector } from './chunk-ca9f6b08.js';

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
var script = {
  name: 'VSpinner',
  props: {
    label: {
      type: String,
      default: ''
    },
    isLabelUnderSpinner: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VSpinner.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-spinner is-overlay",class:{ 'label-under-spinner': _vm.isLabelUnderSpinner }},[_c('div',{staticClass:"spinner loader"}),_vm._v(" "),(_vm.label)?_c('p',{staticClass:"spinner-label"},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-45b9b39e_0", { source: ".v-spinner{background-color:rgba(10,10,10,.66);display:flex;justify-content:center;align-items:center;pointer-events:none}.v-spinner.is-transparent{background-color:transparent}.v-spinner.label-under-spinner{flex-direction:column}.v-spinner .spinner{display:flex;align-self:center}.v-spinner .spinner-label{color:#fff;margin-left:.5em;align-self:center}.v-spinner.is-large .loader{height:2em;width:2em}.is-overlay{position:absolute;top:0;right:0;bottom:0;left:0;z-index:40;width:100%;height:100%}.has-spinner{position:relative}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VSpinner = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    createInjector,
    undefined
  );

export default VSpinner;

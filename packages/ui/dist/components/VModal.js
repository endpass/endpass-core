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
//
//
//
//
// Generic modal component to be used with slots
var script = {
  name: 'VModal',
  methods: {
    close: function close() {
      this.$emit('close');
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VModal.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal is-active"},[_c('div',{staticClass:"modal-background",on:{"click":_vm.close}}),_vm._v(" "),_c('div',{staticClass:"modal-logo"}),_vm._v(" "),_c('div',{staticClass:"modal-card"},[_c('div',{staticClass:"modal-card-head"},[_c('h3',{staticClass:"modal-card-title"},[_vm._t("header")],2),_vm._v(" "),_c('button',{staticClass:"delete is-large",on:{"click":_vm.close}})]),_vm._v(" "),_c('div',{staticClass:"modal-card-body"},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"modal-card-foot"},[_vm._t("footer")],2)])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4014b769_0", { source: ".modal .modal-card .modal-card-head{background-color:#4b0472;border-bottom:none}.modal .modal-card .modal-card-title{color:#fff}.modal .modal-card .modal-card-foot{background-color:#fff;padding:2rem 1rem;text-align:center}.modal .modal-card .modal-card-foot .buttons{flex:1}.modal .modal-card .modal-card-foot .buttons .button:not(:last-child){margin-right:0}.modal.is-dark .modal-background{background-color:#4b0472}.modal.is-dark .modal-card .modal-card-head{background-color:#fff;border-bottom:1px solid #4b0472;color:#4b0472}.modal.is-dark .modal-card .modal-card-title{color:#4b0472}.modal.is-dark .delete{background-color:#4b0472}.modal.is-dark .delete.is-hoevered,.modal.is-dark .delete:hover{background-color:#5b058b;transition:background-color .2s ease-in}.modal.is-dark .modal-logo{position:absolute;top:1rem;left:1rem;width:240px;height:80px;background-size:cover;background-image:url(/static/logo-dark.png)}@media screen and (max-width:1023px){.modal.is-dark .modal-logo{width:144px;height:48px}}.modal.is-naked .modal-card .modal-card-body,.modal.is-naked .modal-card .modal-card-foot,.modal.is-naked .modal-card .modal-card-head{background-color:transparent;color:#fff}.modal.is-naked .modal-card .modal-card-title{color:#fff}.modal.is-naked .modal-card .modal-card-body .label{color:#fff}.modal.is-naked .delete{background-color:transparent}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VModal = __chunk_1.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __chunk_3.createInjector,
    undefined
  );

exports.default = VModal;

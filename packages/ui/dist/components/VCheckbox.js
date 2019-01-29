'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-373f7571.js');

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
  name: 'VCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'checkbox'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      innerValue: this.value
    };
  },
  watch: {
    value: function value(_value) {
      this.innerValue = _value;
    },
    innerValue: function innerValue(value) {
      this.$emit('input', value);
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VCheckbox.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[_c('label',{staticClass:"checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.innerValue),expression:"innerValue"}],class:{'is-danger': _vm.error },attrs:{"name":_vm.name,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.innerValue)?_vm._i(_vm.innerValue,null)>-1:(_vm.innerValue)},on:{"change":function($event){var $$a=_vm.innerValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.innerValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.innerValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.innerValue=$$c;}}}}),_vm._v(" "),_vm._t("default")],2)])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VCheckbox = __chunk_1.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports.default = VCheckbox;

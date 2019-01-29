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
  name: 'VList',
  props: {
    label: {
      type: String,
      default: null
    },
    list: {
      type: [Object, Array],
      default: function _default() {
        return {};
      }
    },
    hasDefaultActive: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      active: null
    };
  },
  computed: {
    isEmpty: function isEmpty() {
      return !Object.keys(this.list).length;
    }
  },
  watch: {
    active: function active(val) {
      this.$emit('input', val);
    },
    list: {
      handler: function handler(val) {
        if (this.hasDefaultActive) {
          this.active = Object.keys(val).find(function (v) {
            return !!v;
          });
        } else {
          this.active = null;
        }
      },
      immediate: true
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VList.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menu"},[(_vm.label)?_c('p',{staticClass:"menu-label"},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]):_vm._e(),_vm._v(" "),(!_vm.isEmpty)?_c('ul',{staticClass:"menu-list"},_vm._l((_vm.list),function(value,key){return _c('li',{key:key},[_c('a',{class:{'is-active': _vm.active === key},on:{"click":function($event){$event.preventDefault();_vm.active = key;}}},[_vm._v("\n        "+_vm._s(value)+"\n      ")])])}),0):_vm._e()])};
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
  

  
  var VList = __chunk_1.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports.default = VList;

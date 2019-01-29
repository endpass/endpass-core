'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-373f7571.js');
var __chunk_2 = require('./chunk-9b9bf453.js');

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
  name: 'VTextarea',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },
  computed: {
    innerValue: {
      get: function get() {
        return this.value;
      },
      set: function set(newVal) {
        this.$emit('input', newVal);
      }
    },
    listeners: function listeners() {
      var _this = this;

      return __chunk_2._objectSpread({}, this.$listeners, {
        input: function input(event) {
          return _this.$emit('input', event.target.value);
        }
      });
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VTextarea.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"control"},[_c('textarea',_vm._g(_vm._b({staticClass:"textarea",domProps:{"value":_vm.innerValue}},'textarea',_vm.$attrs,false),_vm.listeners))])])};
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
  

  
  var VTextarea = __chunk_1.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports.default = VTextarea;

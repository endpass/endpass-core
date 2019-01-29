'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-373f7571.js');
var __chunk_3 = require('./chunk-114c8aa6.js');
var getOptionParameter = _interopDefault(require('@endpass/utils/getOptionParameter'));

//
var script = {
  name: 'VSelect',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    error: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    label: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selected: {
      get: function get() {
        return this.value;
      },
      set: function set(newVal) {
        this.$emit('input', newVal);
      }
    }
  },
  methods: {
    getOptionParameter: getOptionParameter
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VSelect.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"control select"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected),expression:"selected"}],attrs:{"disabled":_vm.disabled,"name":_vm.name},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selected=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.options),function(item){return _c('option',{key:item.key || item.val || item,domProps:{"value":_vm.getOptionParameter(item, 'val')}},[_vm._v(_vm._s(_vm.getOptionParameter(item, 'text')))])}),0)]),_vm._v(" "),(_vm.error)?_c('p',{staticClass:"help is-danger"},[_vm._v("\n    "+_vm._s(_vm.error)+"\n  ")]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-11b7473c_0", { source: ".select:not(.is-multiple):not(.is-loading)::after{border-color:#4b0472}.field .is-naked .select select,.modal .is-naked .select select,form .is-naked .select select{background-color:transparent;color:#fff;border:none}.field .is-naked .select select.is-active,.field .is-naked .select select.is-focused,.field .is-naked .select select:active,.field .is-naked .select select:focus,.modal .is-naked .select select.is-active,.modal .is-naked .select select.is-focused,.modal .is-naked .select select:active,.modal .is-naked .select select:focus,form .is-naked .select select.is-active,form .is-naked .select select.is-focused,form .is-naked .select select:active,form .is-naked .select select:focus{border:1px solid #fff;box-shadow:none}.field .is-naked .select::after,.field .is-naked .select:hover::after,.modal .is-naked .select::after,.modal .is-naked .select:hover::after,form .is-naked .select::after,form .is-naked .select:hover::after{border-color:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VSelect = __chunk_1.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __chunk_3.createInjector,
    undefined
  );

exports.default = VSelect;

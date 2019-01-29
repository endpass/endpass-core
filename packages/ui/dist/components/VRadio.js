'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-373f7571.js');
var __chunk_3 = require('./chunk-114c8aa6.js');
var getOptionParameter = _interopDefault(require('@endpass/utils/getOptionParameter'));

//
var script = {
  name: 'VRadio',
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    id: {
      type: String,
      default: ''
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
    getOptionParameter: getOptionParameter,
    getKeyString: function getKeyString(item) {
      return item.key || item.val || item;
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VRadio.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field is-horizontal has-addons v-radio"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.options),function(option){return _c('div',{key:'label' + _vm.getKeyString(option),staticClass:"control"},[_c('label',{staticClass:"button is-multiline",class:{'is-info is-selected': _vm.getOptionParameter(option, 'val') === _vm.value},attrs:{"for":_vm.id + _vm.getKeyString(option)}},[_vm._v("\n      "+_vm._s(_vm.getOptionParameter(option, 'key'))+"\n      "),(option.help)?_c('span',{staticClass:"help"},[_vm._v("\n        "+_vm._s(option.help)+"\n      ")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected),expression:"selected"}],attrs:{"id":_vm.id + _vm.getKeyString(option),"name":_vm.name,"type":"radio"},domProps:{"value":_vm.getOptionParameter(option, 'val'),"checked":_vm._q(_vm.selected,_vm.getOptionParameter(option, 'val'))},on:{"change":function($event){_vm.selected=_vm.getOptionParameter(option, 'val');}}})])}),_vm._v(" "),(_vm.error)?_c('p',{staticClass:"help is-danger"},[_vm._v("\n    "+_vm._s(_vm.error)+"\n  ")]):_vm._e()],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-671934d8_0", { source: ".v-radio input{display:none}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VRadio = __chunk_1.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __chunk_3.createInjector,
    undefined
  );

exports.default = VRadio;

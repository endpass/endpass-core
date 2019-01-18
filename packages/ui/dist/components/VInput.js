import { a as normalizeComponent } from './chunk-80d3703e.js';
import { a as _objectSpread, b as _toConsumableArray } from './chunk-2844ecbc.js';
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
//
//
//
//
//
var script = {
  name: 'VInput',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: null
    },
    error: {
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
    name: function name() {
      return this.$attrs.name || this.label.replace(' ', '');
    },
    listeners: function listeners() {
      var _this = this;

      return _objectSpread({}, this.$listeners, {
        input: function input(event) {
          return _this.$emit('input', event.target.value);
        }
      });
    },
    classes: function classes() {
      var classes = this.className.split(' ');
      return [].concat(_toConsumableArray(classes), [{
        'is-danger': this.error
      }]);
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VInput.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label",class:{'has-text-danger': _vm.error },attrs:{"for":_vm.$attrs.id}},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"field",class:{'has-addons': _vm.$slots.addon }},[_c('div',{staticClass:"control",class:{'is-expanded': _vm.$slots.addon, 'has-icons-right': _vm.$slots.icon }},[_c('input',_vm._g(_vm._b({staticClass:"input",class:_vm.classes,attrs:{"name":_vm.name},domProps:{"value":_vm.innerValue},on:{"blur":function($event){_vm.$emit('blur', $event.target.value);}}},'input',_vm.$attrs,false),_vm.listeners)),_vm._v(" "),_vm._t("icon")],2),_vm._v(" "),(_vm.$slots.addon)?_c('div',{staticClass:"control"},[_vm._t("addon")],2):_vm._e()]),_vm._v(" "),(_vm.error)?_c('p',{staticClass:"help is-danger"},[_vm._v("\n    "+_vm._s(_vm.error)+"\n  ")]):(_vm.help)?_c('p',{staticClass:"help"},[_vm._v(_vm._s(_vm.help))]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-137d84e4_0", { source: ".field.has-addons{margin-bottom:0}.field.has-addons .control:last-child .button.is-static,.field.has-addons .control:last-child .input,.field.has-addons .control:last-child .select select{border:none;outline:0}.field>.field{margin-bottom:0}.label{color:gray;font-family:\"Proxima Nova\",\"Open Sans\",\"Helvetica Neue\",sans-serif}.help{font-size:.85rem;margin-top:.15rem}.input,.textarea{box-shadow:none;border:none;outline:0;border-radius:0;padding:0;border-bottom:1px solid #4d4d4d;transition:box-shadow .4s,border .4s}.input.is-hovered,.input:hover,.textarea.is-hovered,.textarea:hover{border-bottom:1px solid #4b0472;box-shadow:0 1px 0 0 #4b0472}.input.is-active,.input.is-focused,.input:active,.input:focus,.textarea.is-active,.textarea.is-focused,.textarea:active,.textarea:focus{border-bottom:1px solid #4b0472;box-shadow:0 1px 0 0 #4b0472;font-weight:700}.input.is-danger.is-active,.input.is-danger.is-focused,.input.is-danger.is-hovered,.input.is-danger:active,.input.is-danger:focus,.input.is-danger:hover,.textarea.is-danger.is-active,.textarea.is-danger.is-focused,.textarea.is-danger.is-hovered,.textarea.is-danger:active,.textarea.is-danger:focus,.textarea.is-danger:hover{border-bottom:1px solid #ff3860;box-shadow:0 1px 0 0 #ff3860}.field .is-naked .input,.field .is-naked .textarea,.modal .is-naked .input,.modal .is-naked .textarea,form .is-naked .input,form .is-naked .textarea{background-color:transparent;border-bottom-width:2px;border-bottom-color:#fff}.field .is-naked .input::placeholder,.field .is-naked .textarea::placeholder,.modal .is-naked .input::placeholder,.modal .is-naked .textarea::placeholder,form .is-naked .input::placeholder,form .is-naked .textarea::placeholder{color:gray}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VInput = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    createInjector,
    undefined
  );

export default VInput;

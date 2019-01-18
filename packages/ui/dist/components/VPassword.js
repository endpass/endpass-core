import { a as normalizeComponent } from './chunk-80d3703e.js';
import './chunk-2844ecbc.js';
import VInput from './VInput.js';
import { a as createInjector } from './chunk-ca9f6b08.js';

//

var script = {
  name: 'VPassword',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: null
    },
    // If true, the password is shown to the user
    visible: {
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
      isVisible: this.visible
    };
  },
  computed: {
    inputType: function inputType() {
      return this.isVisible ? 'text' : 'password';
    }
  },
  methods: {
    toggleVisible: function toggleVisible() {
      this.isVisible = !this.isVisible;
    }
  },
  components: {
    VInput: VInput
  }
};

var __$_require_img_eye_svg__ = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"8\" viewBox=\"0 0 8 8\">\n  <path d=\"M4.03 0c-2.53 0-4.03 3-4.03 3s1.5 3 4.03 3c2.47 0 3.97-3 3.97-3s-1.5-3-3.97-3zm-.03 1c1.11 0 2 .9 2 2 0 1.11-.89 2-2 2-1.1 0-2-.89-2-2 0-1.1.9-2 2-2zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1c0-.1-.04-.19-.06-.28-.08.16-.24.28-.44.28-.28 0-.5-.22-.5-.5 0-.2.12-.36.28-.44-.09-.03-.18-.06-.28-.06z\"\n  transform=\"translate(0 1)\" />\n</svg>";

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VPassword.vue";
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-input',_vm._b({attrs:{"type":_vm.inputType,"value":_vm.value,"error":_vm.error,"autocomplete":"current-password"},on:{"input":function($event){_vm.$emit('input', $event);},"blur":function($event){_vm.$emit('blur', $event);}}},'v-input',_vm.$attrs,false),[_c('a',{attrs:{"slot":"icon"},on:{"click":_vm.toggleVisible},slot:"icon"},[_c('span',{staticClass:"icon is-small is-right",domProps:{"innerHTML":_vm._s(__$_require_img_eye_svg__)}})])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4ff6d73b_0", { source: ".control.has-icons-left .icon,.control.has-icons-right .icon{pointer-events:initial}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VPassword = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    createInjector,
    undefined
  );

export default VPassword;

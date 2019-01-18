import { a as normalizeComponent } from './chunk-80d3703e.js';

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
  name: 'VForm',
  props: {
    isFormValid: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    submit: function submit() {
      if (this.isFormValid) {
        this.$emit('submit');
      }
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VForm.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"control",on:{"submit":function($event){$event.preventDefault();return _vm.submit($event)}}},[_vm._t("default")],2)};
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
  

  
  var VForm = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default VForm;

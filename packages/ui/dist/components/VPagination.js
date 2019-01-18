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
  name: 'VPagination',
  data: function data() {
    return {
      page: 1
    };
  },
  methods: {
    changePage: function changePage(diff) {
      this.page += diff;
      this.$emit('input', this.page);
    }
  }
};

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VPagination.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[(_vm.page > 1)?_c('a',{staticClass:"card-header-icon",on:{"click":function($event){$event.preventDefault();_vm.changePage(-1);}}},[_vm._v("\n    < Back\n  ")]):_vm._e(),_vm._v(" "),_c('a',{staticClass:"card-header-icon",on:{"click":function($event){$event.preventDefault();_vm.changePage(1);}}},[_vm._v("\n    Next >\n  ")])])};
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
  

  
  var VPagination = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default VPagination;

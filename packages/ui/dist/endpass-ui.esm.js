import getOptionParameter from '@endpass/utils/getOptionParameter';

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
  name: 'VButton',
  inheritAttrs: false,
  props: {
    className: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function classes() {
      return this.className.split(' ');
    }
  }
};

function normalizeComponent(compiledTemplate, injectStyle, defaultExport, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, isShadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof isShadowMode === 'function') {
        createInjectorSSR = createInjector;
        createInjector = isShadowMode;
        isShadowMode = false;
    }
    // Vue.extend constructor export interop
    const options = typeof defaultExport === 'function' ? defaultExport.options : defaultExport;
    // render functions
    if (compiledTemplate && compiledTemplate.render) {
        options.render = compiledTemplate.render;
        options.staticRenderFns = compiledTemplate.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (injectStyle) {
                injectStyle.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (injectStyle) {
        hook = isShadowMode
            ? function () {
                injectStyle.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
            }
            : function (context) {
                injectStyle.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return defaultExport;
}

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "VButton.vue";

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[_c('div',{staticClass:"control"},[_c('button',_vm._g(_vm._b({staticClass:"button",class:_vm.classes.concat( [{'is-loading' : _vm.loading }]),attrs:{"disabled":_vm.disabled}},'button',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)])])};
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
  

  
  var VButton = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

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
var script$1 = {
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
const __vue_script__$1 = script$1;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$1.__file = "VCheckbox.vue";

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[_c('label',{staticClass:"checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.innerValue),expression:"innerValue"}],class:{'is-danger': _vm.error },attrs:{"name":_vm.name,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.innerValue)?_vm._i(_vm.innerValue,null)>-1:(_vm.innerValue)},on:{"change":function($event){var $$a=_vm.innerValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.innerValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.innerValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.innerValue=$$c;}}}}),_vm._v(" "),_vm._t("default")],2)])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VCheckbox = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
var script$2 = {
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
const __vue_script__$2 = script$2;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$2.__file = "VForm.vue";

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"control",on:{"submit":function($event){$event.preventDefault();return _vm.submit($event)}}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VForm = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

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
var script$3 = {
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

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
const HEAD = document.head || document.getElementsByTagName('head')[0];
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$3 = script$3;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$3.__file = "VInput.vue";

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label",class:{'has-text-danger': _vm.error },attrs:{"for":_vm.$attrs.id}},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"field",class:{'has-addons': _vm.$slots.addon }},[_c('div',{staticClass:"control",class:{'is-expanded': _vm.$slots.addon, 'has-icons-right': _vm.$slots.icon }},[_c('input',_vm._g(_vm._b({staticClass:"input",class:_vm.classes,attrs:{"name":_vm.name},domProps:{"value":_vm.innerValue},on:{"blur":function($event){_vm.$emit('blur', $event.target.value);}}},'input',_vm.$attrs,false),_vm.listeners)),_vm._v(" "),_vm._t("icon")],2),_vm._v(" "),(_vm.$slots.addon)?_c('div',{staticClass:"control"},[_vm._t("addon")],2):_vm._e()]),_vm._v(" "),(_vm.error)?_c('p',{staticClass:"help is-danger"},[_vm._v("\n    "+_vm._s(_vm.error)+"\n  ")]):(_vm.help)?_c('p',{staticClass:"help"},[_vm._v(_vm._s(_vm.help))]):_vm._e()])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-137d84e4_0", { source: ".field.has-addons{margin-bottom:0}.field.has-addons .control:last-child .button.is-static,.field.has-addons .control:last-child .input,.field.has-addons .control:last-child .select select{border:none;outline:0}.field>.field{margin-bottom:0}.label{color:gray;font-family:\"Proxima Nova\",\"Open Sans\",\"Helvetica Neue\",sans-serif}.help{font-size:.85rem;margin-top:.15rem}.input,.textarea{box-shadow:none;border:none;outline:0;border-radius:0;padding:0;border-bottom:1px solid #4d4d4d;transition:box-shadow .4s,border .4s}.input.is-hovered,.input:hover,.textarea.is-hovered,.textarea:hover{border-bottom:1px solid #4b0472;box-shadow:0 1px 0 0 #4b0472}.input.is-active,.input.is-focused,.input:active,.input:focus,.textarea.is-active,.textarea.is-focused,.textarea:active,.textarea:focus{border-bottom:1px solid #4b0472;box-shadow:0 1px 0 0 #4b0472;font-weight:700}.input.is-danger.is-active,.input.is-danger.is-focused,.input.is-danger.is-hovered,.input.is-danger:active,.input.is-danger:focus,.input.is-danger:hover,.textarea.is-danger.is-active,.textarea.is-danger.is-focused,.textarea.is-danger.is-hovered,.textarea.is-danger:active,.textarea.is-danger:focus,.textarea.is-danger:hover{border-bottom:1px solid #ff3860;box-shadow:0 1px 0 0 #ff3860}.field .is-naked .input,.field .is-naked .textarea,.modal .is-naked .input,.modal .is-naked .textarea,form .is-naked .input,form .is-naked .textarea{background-color:transparent;border-bottom-width:2px;border-bottom-color:#fff}.field .is-naked .input::placeholder,.field .is-naked .textarea::placeholder,.modal .is-naked .input::placeholder,.modal .is-naked .textarea::placeholder,form .is-naked .input::placeholder,form .is-naked .textarea::placeholder{color:gray}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var VInput = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    createInjector,
    undefined
  );

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
var script$4 = {
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
const __vue_script__$4 = script$4;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$4.__file = "VList.vue";

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menu"},[(_vm.label)?_c('p',{staticClass:"menu-label"},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]):_vm._e(),_vm._v(" "),(!_vm.isEmpty)?_c('ul',{staticClass:"menu-list"},_vm._l((_vm.list),function(value,key){return _c('li',{key:key},[_c('a',{class:{'is-active': _vm.active === key},on:{"click":function($event){$event.preventDefault();_vm.active = key;}}},[_vm._v("\n        "+_vm._s(value)+"\n      ")])])}),0):_vm._e()])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VList = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

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
var script$5 = {
  name: 'VModal',
  methods: {
    close: function close() {
      this.$emit('close');
    }
  }
};

/* script */
const __vue_script__$5 = script$5;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$5.__file = "VModal.vue";

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal is-active"},[_c('div',{staticClass:"modal-background",on:{"click":_vm.close}}),_vm._v(" "),_c('div',{staticClass:"modal-logo"}),_vm._v(" "),_c('div',{staticClass:"modal-card"},[_c('div',{staticClass:"modal-card-head"},[_c('h3',{staticClass:"modal-card-title"},[_vm._t("header")],2),_vm._v(" "),_c('button',{staticClass:"delete is-large",on:{"click":_vm.close}})]),_vm._v(" "),_c('div',{staticClass:"modal-card-body"},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"modal-card-foot"},[_vm._t("footer")],2)])])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-4014b769_0", { source: ".modal .modal-card .modal-card-head{background-color:#4b0472;border-bottom:none}.modal .modal-card .modal-card-title{color:#fff}.modal .modal-card .modal-card-foot{background-color:#fff;padding:2rem 1rem;text-align:center}.modal .modal-card .modal-card-foot .buttons{flex:1}.modal .modal-card .modal-card-foot .buttons .button:not(:last-child){margin-right:0}.modal.is-dark .modal-background{background-color:#4b0472}.modal.is-dark .modal-card .modal-card-head{background-color:#fff;border-bottom:1px solid #4b0472;color:#4b0472}.modal.is-dark .modal-card .modal-card-title{color:#4b0472}.modal.is-dark .delete{background-color:#4b0472}.modal.is-dark .delete.is-hoevered,.modal.is-dark .delete:hover{background-color:#5b058b;transition:background-color .2s ease-in}.modal.is-dark .modal-logo{position:absolute;top:1rem;left:1rem;width:240px;height:80px;background-size:cover;background-image:url(/static/logo-dark.png)}@media screen and (max-width:1023px){.modal.is-dark .modal-logo{width:144px;height:48px}}.modal.is-naked .modal-card .modal-card-body,.modal.is-naked .modal-card .modal-card-foot,.modal.is-naked .modal-card .modal-card-head{background-color:transparent;color:#fff}.modal.is-naked .modal-card .modal-card-title{color:#fff}.modal.is-naked .modal-card .modal-card-body .label{color:#fff}.modal.is-naked .delete{background-color:transparent}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  

  
  var VModal = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    createInjector,
    undefined
  );

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
// Loading indicator that covers the entire page
var script$6 = {
  name: 'VPageLoader',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__$6 = script$6;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$6.__file = "VPageLoader.vue";

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isLoading)?_c('div',{staticClass:"page-loader modal is-active",attrs:{"data-test":"page-loader"}},[_vm._m(0)]):_vm._e()};
var __vue_staticRenderFns__$6 = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"page-loader-logo"},[_c('img',{attrs:{"src":"/static/logo-dark.png","alt":"Endpass"}})]),_vm._v(" "),_c('div',{staticClass:"spinner"},[_c('div',{staticClass:"spinner-dot spinner-dot-1"}),_vm._v(" "),_c('div',{staticClass:"spinner-dot spinner-dot-2"}),_vm._v(" "),_c('div',{staticClass:"spinner-dot spinner-dot-3"})]),_vm._v(" "),_c('p',{staticClass:"spinner-caption"},[_vm._v("Loading...")])])}];

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-a2b3eefc_0", { source: ".page-loader{color:#fff;background-color:#4b0472}.page-loader .page-loader-logo{margin:0 auto;text-align:center}.page-loader .page-loader-logo img{height:auto;width:auto;max-height:6rem}.page-loader .spinner-caption{text-align:center;margin:0 auto}.page-loader .spinner{margin:1rem auto 0;width:70px;text-align:center}.page-loader .spinner .spinner-dot{width:18px;height:18px;background-color:#fff;border-radius:100%;display:inline-block;animation:bouncedelay 1.4s infinite ease-in-out both}.page-loader .spinner .spinner-dot-1{animation-delay:-.32s}.page-loader .spinner .spinner-dot-2{animation-delay:-.16s}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  

  
  var VPageLoader = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    createInjector,
    undefined
  );

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
var script$7 = {
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
const __vue_script__$7 = script$7;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$7.__file = "VPagination.vue";

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[(_vm.page > 1)?_c('a',{staticClass:"card-header-icon",on:{"click":function($event){$event.preventDefault();_vm.changePage(-1);}}},[_vm._v("\n    < Back\n  ")]):_vm._e(),_vm._v(" "),_c('a',{staticClass:"card-header-icon",on:{"click":function($event){$event.preventDefault();_vm.changePage(1);}}},[_vm._v("\n    Next >\n  ")])])};
var __vue_staticRenderFns__$7 = [];

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VPagination = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

//

var script$8 = {
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
const __vue_script__$8 = script$8;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$8.__file = "VPassword.vue";
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-input',_vm._b({attrs:{"type":_vm.inputType,"value":_vm.value,"error":_vm.error,"autocomplete":"current-password"},on:{"input":function($event){_vm.$emit('input', $event);},"blur":function($event){_vm.$emit('blur', $event);}}},'v-input',_vm.$attrs,false),[_c('a',{attrs:{"slot":"icon"},on:{"click":_vm.toggleVisible},slot:"icon"},[_c('span',{staticClass:"icon is-small is-right",domProps:{"innerHTML":_vm._s(__$_require_img_eye_svg__)}})])])};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$8 = function (inject) {
    if (!inject) return
    inject("data-v-4ff6d73b_0", { source: ".control.has-icons-left .icon,.control.has-icons-right .icon{pointer-events:initial}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  

  
  var VPassword = normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    createInjector,
    undefined
  );

//
var script$9 = {
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
const __vue_script__$9 = script$9;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$9.__file = "VRadio.vue";

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field is-horizontal has-addons v-radio"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.options),function(option){return _c('div',{key:'label' + _vm.getKeyString(option),staticClass:"control"},[_c('label',{staticClass:"button is-multiline",class:{'is-info is-selected': _vm.getOptionParameter(option, 'val') === _vm.value},attrs:{"for":_vm.id + _vm.getKeyString(option)}},[_vm._v("\n      "+_vm._s(_vm.getOptionParameter(option, 'key'))+"\n      "),(option.help)?_c('span',{staticClass:"help"},[_vm._v("\n        "+_vm._s(option.help)+"\n      ")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected),expression:"selected"}],attrs:{"id":_vm.id + _vm.getKeyString(option),"name":_vm.name,"type":"radio"},domProps:{"value":_vm.getOptionParameter(option, 'val'),"checked":_vm._q(_vm.selected,_vm.getOptionParameter(option, 'val'))},on:{"change":function($event){_vm.selected=_vm.getOptionParameter(option, 'val');}}})])}),_vm._v(" "),(_vm.error)?_c('p',{staticClass:"help is-danger"},[_vm._v("\n    "+_vm._s(_vm.error)+"\n  ")]):_vm._e()],2)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  const __vue_inject_styles__$9 = function (inject) {
    if (!inject) return
    inject("data-v-671934d8_0", { source: ".v-radio input{display:none}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  

  
  var VRadio = normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    createInjector,
    undefined
  );

//
var script$a = {
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
const __vue_script__$a = script$a;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$a.__file = "VSelect.vue";

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"control select"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected),expression:"selected"}],attrs:{"disabled":_vm.disabled,"name":_vm.name},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selected=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.options),function(item){return _c('option',{key:item.key || item.val || item,domProps:{"value":_vm.getOptionParameter(item, 'val')}},[_vm._v(_vm._s(_vm.getOptionParameter(item, 'text')))])}),0)]),_vm._v(" "),(_vm.error)?_c('p',{staticClass:"help is-danger"},[_vm._v("\n    "+_vm._s(_vm.error)+"\n  ")]):_vm._e()])};
var __vue_staticRenderFns__$a = [];

  /* style */
  const __vue_inject_styles__$a = function (inject) {
    if (!inject) return
    inject("data-v-11b7473c_0", { source: ".select:not(.is-multiple):not(.is-loading)::after{border-color:#4b0472}.field .is-naked .select select,.modal .is-naked .select select,form .is-naked .select select{background-color:transparent;color:#fff;border:none}.field .is-naked .select select.is-active,.field .is-naked .select select.is-focused,.field .is-naked .select select:active,.field .is-naked .select select:focus,.modal .is-naked .select select.is-active,.modal .is-naked .select select.is-focused,.modal .is-naked .select select:active,.modal .is-naked .select select:focus,form .is-naked .select select.is-active,form .is-naked .select select.is-focused,form .is-naked .select select:active,form .is-naked .select select:focus{border:1px solid #fff;box-shadow:none}.field .is-naked .select::after,.field .is-naked .select:hover::after,.modal .is-naked .select::after,.modal .is-naked .select:hover::after,form .is-naked .select::after,form .is-naked .select:hover::after{border-color:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject SSR */
  

  
  var VSelect = normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    createInjector,
    undefined
  );

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
var script$b = {
  name: 'VSpinner',
  props: {
    label: {
      type: String,
      default: ''
    },
    isLabelUnderSpinner: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__$b = script$b;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$b.__file = "VSpinner.vue";

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-spinner is-overlay",class:{ 'label-under-spinner': _vm.isLabelUnderSpinner }},[_c('div',{staticClass:"spinner loader"}),_vm._v(" "),(_vm.label)?_c('p',{staticClass:"spinner-label"},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]):_vm._e()])};
var __vue_staticRenderFns__$b = [];

  /* style */
  const __vue_inject_styles__$b = function (inject) {
    if (!inject) return
    inject("data-v-45b9b39e_0", { source: ".v-spinner{background-color:rgba(10,10,10,.66);display:flex;justify-content:center;align-items:center;pointer-events:none}.v-spinner.is-transparent{background-color:transparent}.v-spinner.label-under-spinner{flex-direction:column}.v-spinner .spinner{display:flex;align-self:center}.v-spinner .spinner-label{color:#fff;margin-left:.5em;align-self:center}.v-spinner.is-large .loader{height:2em;width:2em}.is-overlay{position:absolute;top:0;right:0;bottom:0;left:0;z-index:40;width:100%;height:100%}.has-spinner{position:relative}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject SSR */
  

  
  var VSpinner = normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    createInjector,
    undefined
  );

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
var script$c = {
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

      return _objectSpread({}, this.$listeners, {
        input: function input(event) {
          return _this.$emit('input', event.target.value);
        }
      });
    }
  }
};

/* script */
const __vue_script__$c = script$c;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$c.__file = "VTextarea.vue";

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('label',{staticClass:"label"},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"control"},[_c('textarea',_vm._g(_vm._b({staticClass:"textarea",domProps:{"value":_vm.innerValue}},'textarea',_vm.$attrs,false),_vm.listeners))])])};
var __vue_staticRenderFns__$c = [];

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VTextarea = normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );



var components = /*#__PURE__*/Object.freeze({
  VButton: VButton,
  VCheckbox: VCheckbox,
  VForm: VForm,
  VInput: VInput,
  VList: VList,
  VModal: VModal,
  VPageLoader: VPageLoader,
  VPagination: VPagination,
  VPassword: VPassword,
  VRadio: VRadio,
  VSelect: VSelect,
  VSpinner: VSpinner,
  VTextarea: VTextarea
});

var main = (function (Vue) {
  Object.values(components).forEach(function (component) {
    return Vue.component(component.name, component);
  });
});

export default main;
export { VButton, VCheckbox, VForm, VInput, VList, VModal, VPageLoader, VPagination, VPassword, VRadio, VSelect, VSpinner, VTextarea };

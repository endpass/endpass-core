const objects = require(__dirname + '/objects');
const kebabCase = require('lodash/kebabCase');

function convertDirectivesToAttrs(directives) {
  const attrs = {};

  if (directives) {
    directives.forEach(({ rawName, expression }) => {
      attrs[rawName] = expression;
    });
  }

  return attrs;
}

function convertListenersToAttrs(listeners) {
  const attrs = {};

  if (listeners) {
    Object.keys(listeners).forEach(key => {
      const handlers = [].concat(listeners[key]);
      const handler = handlers.find(h => {
        const name = objects.getFrom(h, 'fns.name', 'name') || '';

        return name.includes('bound ');
      });

      if (handler) {
        attrs[`v-on:${key}`] = (handler.fns || handler).name;
      }
    });
  }

  return attrs;
}

function convertModelToAttrs(model) {
  return model ? { 'v-model': model.expression } : {};
}

function convertSlotToAttrs(slot) {
  return slot ? { slot } : {};
}

function generateElement(createElement, vnode) {
  return vnode.componentOptions
    ? generateElementFromComponent(createElement, vnode)
    : generateElementFromHTML(createElement, vnode);
}

function getChildrenElements(createElement, children) {
  return children
    ? children.map(child => generateElement(createElement, child))
    : undefined;
}

function createCommonData(directives, listeners, model) {
  return Object.assign(
    {},
    convertDirectivesToAttrs(directives),
    convertListenersToAttrs(listeners),
    convertModelToAttrs(model),
  );
}

function generateElementFromComponent(
  createElement,
  { data, componentOptions },
) {
  const { attrs, directives, model } = data;
  const { tag, listeners, children } = componentOptions;
  const componentData = Object.assign({}, data);
  componentData.hook = undefined
  componentData.staticClass = undefined;
  componentData.attrs = Object.assign(
    {},
    attrs,
    createCommonData(directives, listeners, model),
    { class: data.staticClass }
  );
  if (listeners) {
    componentData.on = Object.assign({}, listeners);
  }

  return createElement(
    tag,
    componentData,
    getChildrenElements(createElement, children),
  );
}

function generateElementFromHTML(createElement, vnode) {
  if (!vnode.data) {
    return vnode;
  }

  const { tag, data, children } = vnode;
  const { directives, on, model, attrs = {}, slot } = data;
  const componentData = Object.assign({}, data)
  componentData.attrs = Object.assign(
    {},
    createCommonData(directives, on, model),
    convertSlotToAttrs(slot),
    attrs,
  );
  return createElement(
    tag,
    componentData,
    getChildrenElements(createElement, children),
  );
}

module.exports.generateStubs = (Component) => {
  console.warn('generateStubs is deprecated utility. Don\'t use it in new code.');

  return Object.values(Component.components).reduce((stubs, stubComponent) => {
    let elementName;

    if (stubComponent.name) {
      elementName = kebabCase(stubComponent.name);
    }

    return Object.assign(stubs, {
      [elementName]: {
        render(createElement) {
          return generateElementFromComponent(createElement, this.$vnode);
        },
      },
    });
  }, {});
}

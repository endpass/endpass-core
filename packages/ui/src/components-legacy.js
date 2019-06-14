import * as components from '@/components';

export * from '@/components';

export default Vue => {
  Object.values(components).forEach(component =>
    Vue.component(component.name, component),
  );
};

import * as components from '@/kit';

export * from '@/kit';

export default Vue => {
  Object.values(components).forEach(component =>
    Vue.component(component.name, component),
  );
};

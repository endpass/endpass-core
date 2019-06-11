import * as components from '@/kit';
import './scss/kit.theme-default.scss';

export * from '@/kit';

export default Vue => {
  Object.values(components).forEach(component =>
    Vue.component(component.name, component),
  );
};

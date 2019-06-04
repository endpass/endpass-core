import * as components from '@/components';
import './scss/main.theme-default.scss';

export * from '@/components';

export default Vue => {
  Object.values(components).forEach(component =>
    Vue.component(component.name, component),
  );
};

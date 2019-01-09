import { shallowMount } from '@vue/test-utils';

import VModal from '@/components/VModal';

describe('VModal page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VModal);
  });

  describe('render', () => {
    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VModal');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should render initial state of the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

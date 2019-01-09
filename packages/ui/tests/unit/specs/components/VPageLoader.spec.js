import { shallowMount } from '@vue/test-utils';

import VPageLoader from '@/components/VPageLoader';

describe('VPageLoader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VPageLoader);
  });

  describe('render', () => {
    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VPageLoader');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should render initial state of the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

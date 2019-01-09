import { shallowMount } from '@vue/test-utils';

import VForm from '@/form/VForm';

describe('VForm page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(VForm);
  });

  describe('render', () => {
    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VForm');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should render initial state of the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

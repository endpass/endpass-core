import { shallowMount } from '@vue/test-utils';

import VSpinner from '@/components/VSpinner';

describe('VSpinner', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(VSpinner);
  });

  describe('render', () => {
    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VSpinner');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('props', () => {
    describe('label', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoading: true });
      });

      it('should render label', () => {
        const label = 'label';

        wrapper.setProps({ label });

        expect(wrapper.find('.spinner-label').text()).toBe(label);
      });

      it('should not render label', () => {
        wrapper.setProps({ label: '' });

        expect(wrapper.find('.spinner-label').exists()).toBeFalsy();
      });
    });
  });
});

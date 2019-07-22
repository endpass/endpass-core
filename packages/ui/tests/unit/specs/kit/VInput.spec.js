import { shallowMount } from '@vue/test-utils';

import VInput from '@/kit/VInput';

describe('VInput', () => {
  let wrapper;

  describe('render', () => {
    const attrs = {
      id: 'id',
      placeholder: 'placeholder',
      disabled: 'disabled',
    };

    beforeEach(() => {
      wrapper = shallowMount(VInput, {
        attrs,
      });
    });

    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VInput');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should correctly render component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render component with label', () => {
      wrapper.setProps({ label: 'Label' });

      expect(wrapper.find('label-atom-stub').props().label).toBe('Label');
      expect(wrapper.find('label-atom-stub').exists()).toBe(true);
    });
  });

  describe('behavior', () => {
    it('should set default listener for input event', () => {
      wrapper = shallowMount(VInput, {
        attrs: {
          value: '',
        },
      });

      wrapper.find('input-atom-stub').vm.$emit('input', 'foo');

      expect(wrapper.emitted().input).toEqual([['foo']]);
    });
  });
});

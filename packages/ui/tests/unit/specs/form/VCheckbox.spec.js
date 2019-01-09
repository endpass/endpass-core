import { shallowMount } from '@vue/test-utils';

import VCheckbox from '@/form/VCheckbox';

describe('VCheckbox', () => {
  describe('render', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallowMount(VCheckbox, {
        slots: {
          default: '<div/>',
        },
      });
    });

    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VCheckbox');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should render component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('props', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMount(VCheckbox);
    });

    describe('value', () => {
      it('should change checkbox state', () => {
        wrapper.setProps({ value: true });
        expect(
          wrapper.find('input[type="checkbox"]').element.checked,
        ).toBeTruthy();

        wrapper.setProps({ value: false });
        expect(
          wrapper.find('input[type="checkbox"]').element.checked,
        ).toBeFalsy();
      });
    });
  });
});

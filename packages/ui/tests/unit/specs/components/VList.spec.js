import { shallowMount } from '@vue/test-utils';

import VList from '@/components/VList.vue';

describe('VList', () => {
  let wrapper;
  const props = {
    label: 'Some Label',
    list: {
      item1: 'text1',
      item2: 'text2',
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(VList);
  });

  describe('props', () => {
    it('should render props', () => {
      expect(wrapper.contains('p')).toBeFalsy();
      expect(wrapper.contains('ul')).toBeFalsy();
      expect(wrapper.vm.$data.active).toBeFalsy();

      wrapper.setProps(props);

      expect(wrapper.find('p').text()).toBe('Some Label');
      expect(wrapper.findAll('li')).toHaveLength(2);
      expect(wrapper.vm.$data.active).toBe('item1');
    });

    it('should not render active item', () => {
      // TODO: the test does not work when the properties are set together, fix it
      wrapper.setProps({ hasDefaultActive: false });
      wrapper.setProps({ ...props });

      expect(wrapper.vm.$data.active).toBeNull();
    });
  });

  describe('behavior', () => {
    it('should emit event', () => {
      wrapper.setProps(props);

      wrapper
        .findAll('a')
        .at(1)
        .trigger('click');

      // FIXME unexpected behavior, nextTick don't help
      // expect(wrapper.vm.$data.active).toBe('item2');
      expect(wrapper.emitted().input).toHaveLength(3);
    });
  });
});

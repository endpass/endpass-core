import { shallowMount } from '@vue/test-utils';

import VSvgIcon from '@/components/VSvgIcon';

describe('VSvgIcon', () => {
  let wrapper;
  const url = 'TestUrl';

  beforeAll(() => {
    wrapper = shallowMount(VSvgIcon, {
      propsData: {
        iconPath: {
          default: {
            url,
          },
        },
      },
    });
  });

  describe('render', () => {
    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VSvgIcon');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should render component', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('props', () => {
    it('should use default props', () => {
      const svg = wrapper.find('svg');

      expect(svg.attributes('width')).toBe('20px');
      expect(svg.attributes('height')).toBe('20px');
      expect(svg.attributes('fill')).toBe('');
      expect(svg.find('use').attributes('href')).toBe(url);
    });

    it('should redefine props', () => {
      wrapper.setProps({
        width: '125px',
        height: '256px',
        fill: 'blackWindow',
        iconPath: { default: { url: 'newPath' } },
      });

      const svg = wrapper.find('svg');

      expect(svg.attributes('width')).toBe('125px');
      expect(svg.attributes('height')).toBe('256px');
      expect(svg.attributes('fill')).toBe('blackWindow');
      expect(svg.find('use').attributes('href')).toBe('newPath');
    });
  });
});

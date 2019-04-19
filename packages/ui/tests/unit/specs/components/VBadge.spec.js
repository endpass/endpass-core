import { shallowMount } from '@vue/test-utils';
import VBadge from '@/components/VBadge';

describe('VBadge', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VBadge);
  });

  it('should be a correct VBadge', () => {
    expect(wrapper.name()).toBe('VBadge');
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});

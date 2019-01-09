import { shallowMount } from '@vue/test-utils';

import VButton from '@/form/VButton';

const attrs = {
  id: 'some-id',
  name: 'name',
};

const listeners = {
  click: jest.fn(),
};

describe('VButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VButton, {
      attrs,
      listeners,
    });
  });

  it('should render props', () => {
    const button = wrapper.find('button');

    expect(button.classes()).not.toContain('is-loading');
    expect(wrapper.contains('a.some-class.some-class-1')).toBeFalsy();

    wrapper.setProps({
      loading: true,
      className: 'some-class some-class-1',
    });

    expect(button.attributes().id).toBe('some-id');
    expect(button.classes()).toContain('is-loading');
    expect(wrapper.contains('button.some-class.some-class-1')).toBeTruthy();
  });

  it('should pass attributes down to the inner element', () => {
    const inner = wrapper.find('button');
    expect(wrapper.attributes().name).toBeFalsy();
    expect(inner.attributes().name).toBe('name');
  });

  it('should emit event if not disabled', async () => {
    const button = wrapper.find('button');

    expect(button.attributes().disabled).toBeFalsy();

    button.trigger('click');

    expect(listeners.click.fns).toHaveBeenCalledTimes(1);

    wrapper.setProps({ disabled: true });
    // button.trigger('click');
    // expect(wrapper.emitted().click).toBeFalsy();
    expect(button.attributes().disabled).toBeTruthy();

    wrapper.setProps({ disabled: false });
    expect(button.attributes().disabled).toBeFalsy();

    button.trigger('click');

    expect(listeners.click.fns).toHaveBeenCalledTimes(2);
  });
});

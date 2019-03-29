import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallowMount } from '@vue/test-utils';

import VFaucetButton from '@/components/VFaucetButton';

const attrs = {
  id: 'some-id',
  name: 'name',
};

const listeners = {
  click: jest.fn(),
  'before-send': jest.fn(),
  donate: jest.fn(),
  'donate-error': jest.fn(),
};

describe('VFaucetButton', () => {
  let wrapper;
  let axiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);

    wrapper = shallowMount(VFaucetButton, {
      attrs,
      listeners,
      propsData: {
        address: 'initial-address',
      },
    });
  });

  it('should render props', () => {
    const button = wrapper.find('button');

    expect(button.classes()).not.toContain('is-loading');
    expect(wrapper.contains('a.some-class.some-class-1')).toBeFalsy();

    wrapper.setProps({
      className: 'some-class some-class-1',
    });

    expect(wrapper.attributes().name).toBe('name');
    expect(button.attributes().id).toBe('some-id');
    expect(button.attributes().type).toBe('button');
    expect(button.classes()).not.toContain('is-loading');
    expect(wrapper.contains('button.some-class.some-class-1')).toBeTruthy();
  });

  describe('requests', () => {
    const url = 'test/api/testAddr';

    beforeEach(() => {
      wrapper.setProps({
        faucetApi: 'test/api',
        address: 'testAddr',
      });
    });

    it('should send donate request by api prop', async () => {
      expect.assertions(5);

      const button = wrapper.find('button');

      axiosMock.onGet(url).reply(config => {
        expect(config.method).toBe('get');
        expect(config.url).toBe(url);

        return [200, { passData: true }];
      });

      expect(wrapper.emitted()['before-send']).toBeUndefined();

      button.trigger('click');

      await flushPromises();
      expect(wrapper.emitted()['before-send']).not.toBeUndefined();

      expect(wrapper.emitted().donate[0][0]).toMatchObject({
        passData: true,
      });
    });

    it('should emit donate-error event', async () => {
      expect.assertions(3);

      const button = wrapper.find('button');

      axiosMock.onGet(url).reply(config => {
        expect(config.method).toBe('get');
        expect(config.url).toBe(url);

        return [404, { passData: true }];
      });

      button.trigger('click');

      await flushPromises();

      const err = new Error('Request failed with status code 404');
      expect(wrapper.emitted()['donate-error'][0][0]).toMatchObject(err);
    });
  });

  it('should emit event if not disabled', async () => {
    expect.assertions(5);

    listeners.click.fns = jest.fn();
    wrapper.setProps({
      faucetApi: 'test/api',
    });

    const button = wrapper.find('button');

    expect(button.attributes().disabled).toBeFalsy();

    button.trigger('click');

    expect(listeners.click.fns).toHaveBeenCalledTimes(1);

    wrapper.setProps({ disabled: true });

    expect(button.attributes().disabled).toBeTruthy();

    wrapper.setProps({ disabled: false });
    expect(button.attributes().disabled).toBeFalsy();

    button.trigger('click');

    expect(listeners.click.fns).toHaveBeenCalledTimes(2);
  });
});

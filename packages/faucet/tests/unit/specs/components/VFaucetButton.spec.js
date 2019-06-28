import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallowMount } from '@vue/test-utils';

import VFaucetButton from '@/components/VFaucetButton';

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
      scopedSlots: {
        default:
          '<div data-test="action" @click="props.sendRequest" :disabled="props.isLoading"></div>',
      },
      listeners,
      propsData: {
        faucetApi: 'test/api',
        address: 'testAddr',
      },
    });
  });

  it('should render props', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('events', () => {
    const url = 'test/api/testAddr';

    it('should send donate request by api prop', async () => {
      expect.assertions(8);

      const button = wrapper.find('[data-test=action]');
      axiosMock.onGet(url).reply(config => {
        expect(config.method).toBe('get');
        expect(config.url).toBe(url);

        return [200, { passData: true }];
      });

      expect(wrapper.emitted()['before-send']).toBeUndefined();
      expect(button.attributes().disabled).toBeUndefined();

      button.trigger('click');

      expect(button.attributes().disabled).toBeTruthy();

      await global.flushPromises();

      expect(wrapper.emitted()['before-send']).not.toBeUndefined();
      expect(wrapper.emitted().donate[0][0]).toMatchObject({
        passData: true,
      });
      expect(button.attributes().disabled).toBeUndefined();
    });

    it('should emit donate-error event', async () => {
      expect.assertions(6);

      const button = wrapper.find('[data-test=action]');

      axiosMock.onGet(url).reply(config => {
        expect(config.method).toBe('get');
        expect(config.url).toBe(url);

        return [404, { passData: true }];
      });

      expect(button.attributes().disabled).toBeUndefined();

      button.trigger('click');

      expect(button.attributes().disabled).toBeTruthy();

      await global.flushPromises();

      const err = new Error('Request failed with status code 404');
      expect(wrapper.emitted()['donate-error'][0][0]).toMatchObject(err);
      expect(button.attributes().disabled).toBeUndefined();
    });
  });
});

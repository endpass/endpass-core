import HttpProvider from 'web3-providers-http';
import IpcProvider from 'web3-providers-ipc';
import WebsocketProvider from 'web3-providers-ws';
import ProviderFactory from '@/provider/ProviderFactory';
import MockMixin from '@/provider/mixins/MockMixin';

describe('ProviderFactory', () => {
  const httpUrl = 'https://url.com';
  const wsUrl = 'wss://url.com';

  describe('getProviderClass', () => {
    it('should return correct provider class', () => {
      const ipcUrl = '/path/geth.ipc';
      const ipcConnection = { connect: jest.fn(() => ({ on: jest.fn() })) };

      const HttpP = ProviderFactory.getProviderClass(httpUrl);
      const WsP = ProviderFactory.getProviderClass(wsUrl);
      const IpcP = ProviderFactory.getProviderClass(ipcUrl);

      expect(new HttpP(httpUrl)).toBeInstanceOf(HttpProvider);
      expect(new WsP(wsUrl)).toBeInstanceOf(WebsocketProvider);
      expect(new IpcP(ipcUrl, ipcConnection)).toBeInstanceOf(IpcProvider);
    });

    it('should throw error with wrong url', () => {
      const wrongUrl = '//url.com';

      expect(() => ProviderFactory.getProviderClass(wrongUrl)).toThrow();
    });
  });

  describe('getInstance', () => {
    it('should return provider instance', () => {
      expect(ProviderFactory.getInstance(httpUrl)).toBeInstanceOf(HttpProvider);
    });

    it('should return mocked provider instance when Cypress', () => {
      global.Cypress = true;

      const provider = ProviderFactory.getInstance(httpUrl);

      // instanceof not work
      expect(provider.constructor.name).toBe(MockMixin(HttpProvider).name);

      global.Cypress = undefined;
    });
  });

  describe('create', () => {
    it('should return provider instance', () => {
      expect(ProviderFactory.create(httpUrl)).toBeInstanceOf(HttpProvider);
    });

    it('should return provider instance with fallback', () => {
      const urls = [].concat(httpUrl, wsUrl, 'http://temp.com');
      const provider = ProviderFactory.create(urls);
      const fallback = provider.getFallbackProviders();

      expect(provider).toBeInstanceOf(HttpProvider);
      expect(fallback).toHaveLength(2);
      expect(fallback[0]).toBeInstanceOf(WebsocketProvider);
      expect(fallback[1]).toBeInstanceOf(HttpProvider);
    });

    it('should return provider instance with error handler setter', () => {
      const provider = ProviderFactory.create(httpUrl);

      expect(provider.setErrorHandler).toBeInstanceOf(Function);
    });
  });
});

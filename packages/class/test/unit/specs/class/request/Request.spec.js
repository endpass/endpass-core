import Request from '@/request';

describe('Request class', () => {
  let request;
  let config;
  let http;
  const createAnswer = result => result;

  beforeEach(() => {
    config = {
      option: 'option',
    };
    http = {
      get(url, config) {
        return createAnswer({ url, config });
      },
      post(url, body, config) {
        return createAnswer({ url, body, config });
      },
      delete(url, config) {
        return createAnswer({ url, config });
      },
    };
    request = new Request({ config, http, createAnswer });
  });

  describe('config', () => {
    it('should use default config for GET', () => {
      const result = request.get('url');

      expect(result.config).toEqual({
        option: 'option',
      });
    });

    it('should use default config for POST', () => {
      const result = request.post('url', 'body');

      expect(result.config).toEqual({
        option: 'option',
      });
    });

    it('should use default config for DELETE', () => {
      const result = request.delete('url');

      expect(result.config).toEqual({
        option: 'option',
      });
    });

    it('should use new config', () => {
      const newConfig = {
        optionChanged: 'optionChanged',
      };

      request.config = newConfig;
      const result = request.get('url');

      expect(result.config).toEqual(newConfig);
    });
  });

  describe('upload', () => {
    it('should add headers to upload', () => {
      const result = request.upload('url', { uploadField: 'uploadField' });

      expect(result.config).toEqual({
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    });

    it('should create FormData from body fields for send', () => {
      const uploadField = 'uploadField';
      const formData = new FormData();
      formData.append('uploadField', uploadField);

      const result = request.upload('url', { uploadField });

      expect(result.body).toEqual(formData);
    });
  });
});

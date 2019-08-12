/* eslint-disable no-console */
import SWUtils from '@/static/SWUtils';

describe('SWUtils', () => {
  const isCorrect = (url, wildCard) => url.search(wildCard) === 0;

  describe('create wildcard url', () => {
    it('should create single * in the middle', () => {
      const wildCard = SWUtils.createWildCardUrl('://section/*/block');
      console.log('wildCard', wildCard);

      expect(isCorrect('://section/5/block', wildCard)).toBe(true);
      expect(isCorrect('://section/other/block', wildCard)).toBe(true);

      expect(isCorrect('://section/1/block/next', wildCard)).toBe(false);
      expect(isCorrect('://section/2/block/', wildCard)).toBe(false);
      expect(isCorrect('://section/3/none', wildCard)).toBe(false);
      expect(isCorrect('://section/other', wildCard)).toBe(false);
      expect(isCorrect('://section', wildCard)).toBe(false);
    });

    it('should create double "**" in the middle', () => {
      const wildCard = SWUtils.createWildCardUrl('://section/**/test');
      console.log('wildCard', wildCard);

      expect(isCorrect('://section/info/test', wildCard)).toBe(true);
      expect(isCorrect('://section/other/test', wildCard)).toBe(true);
      expect(isCorrect('://section/info/next/test', wildCard)).toBe(true);
      expect(isCorrect('://section/info/456/test', wildCard)).toBe(true);

      expect(isCorrect('://section/info/test/', wildCard)).toBe(false);
      expect(isCorrect('://section/info/none', wildCard)).toBe(false);
      expect(isCorrect('://section/other', wildCard)).toBe(false);
      expect(isCorrect('://section', wildCard)).toBe(false);
    });

    it('should create double "**" in the end', () => {
      const wildCard = SWUtils.createWildCardUrl('://section/**');
      console.log('wildCard', wildCard);

      expect(isCorrect('://section/', wildCard)).toBe(true);
      expect(isCorrect('://section/info/test', wildCard)).toBe(true);
      expect(isCorrect('://section/other/test', wildCard)).toBe(true);
      expect(isCorrect('://section/info/next/test', wildCard)).toBe(true);
      expect(isCorrect('://section/info/456/test', wildCard)).toBe(true);
      expect(isCorrect('://section/info/test/', wildCard)).toBe(true);
      expect(isCorrect('://section/info/none', wildCard)).toBe(true);

      expect(isCorrect('://section', wildCard)).toBe(false);
      expect(isCorrect('://456/other', wildCard)).toBe(false);
      expect(isCorrect('://456', wildCard)).toBe(false);
    });

    it('should create single "*" in the middle and double "**" in the end', () => {
      const wildCard = SWUtils.createWildCardUrl('://section/*/info/**');
      console.log('wildCard', wildCard);

      expect(isCorrect('://section/text/info/test', wildCard)).toBe(true);
      expect(isCorrect('://section/text/info/', wildCard)).toBe(true);
      expect(isCorrect('://section/block/info/next/test', wildCard)).toBe(true);

      expect(isCorrect('://section/', wildCard)).toBe(false);
      expect(isCorrect('://section', wildCard)).toBe(false);
      expect(isCorrect('://section/text/info', wildCard)).toBe(false);
      expect(isCorrect('://section/info/none', wildCard)).toBe(false);
      expect(isCorrect('://456/other', wildCard)).toBe(false);
      expect(isCorrect('://456', wildCard)).toBe(false);
    });

    it('should create /*$', () => {
      const wildCard = SWUtils.createWildCardUrl('http://section/*');
      console.log('wildCard', wildCard);

      expect(isCorrect('http://section/test', wildCard)).toBe(true);
      expect(isCorrect('http://section/', wildCard)).toBe(true);

      expect(isCorrect('http://section', wildCard)).toBe(false);
      expect(isCorrect('http://section/test/456', wildCard)).toBe(false);
    });
  });
});

import { filterObject, filterNullableParams } from '@/filterParams';

describe('filterParams', () => {
  const allTypes = {
    boolTrue: true,
    boolFalse: false,
    objVal: {},
    arrayEmptyVal: [],
    arrayVal: [1],
    numberVal: 1,
    stringVal: 'string',
    emptyString: '',
    nullVal: null,
    undef: undefined,
  };

  describe('filterObject', () => {
    it('should filter by defined exceptions', () => {
      const { numberVal, stringVal, ...withoutNumString } = allTypes;
      expect(
        filterObject(allTypes, [1, 'string']),
      ).toEqual(withoutNumString);
    });
  });

  describe('filterNullableParams', () => {
    it('should return object without null or undefined', () => {
      const { nullVal, undef, ...withoutNullUndefined } = allTypes;
      expect(filterNullableParams(allTypes)).toEqual(withoutNullUndefined);
    });
  });
});

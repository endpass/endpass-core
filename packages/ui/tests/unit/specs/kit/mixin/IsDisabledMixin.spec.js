import IsDisabledMixin from '@/mixins/IsDisabledMixin';

describe('IsDisabledMixin', () => {
  function callDisabled($attrs) {
    return IsDisabledMixin.computed.isDisabled.call({
      $attrs,
    });
  }

  it('should be a false disable value', () => {
    expect(callDisabled({
      disabled: false,
    })).toBe(false);

    expect(callDisabled({})).toBe(false);

    expect(callDisabled({
      title: 'title',
    })).toBe(false);
  });

  it('should be a true disable value', () => {
    expect(callDisabled({
      disabled: undefined,
    })).toBe(true);

    expect(callDisabled({
      disabled: '',
    })).toBe(true);

    expect(callDisabled({
      disabled: 'disabled',
    })).toBe(true);

    expect(callDisabled({
      disabled: true,
    })).toBe(true);

    expect(callDisabled({
      disabled: 'dis',
    })).toBe(true);
  });
});

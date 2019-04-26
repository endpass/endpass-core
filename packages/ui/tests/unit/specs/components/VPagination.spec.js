import { shallowMount } from '@vue/test-utils';

import VPagination from '@/components/VPagination';

describe('VPagination', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VPagination);
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VPagination');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('behaviour', () => {
    it('should render only "next"', () => {
      expect(wrapper.find('[data-test=pagination-next]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=pagination-prev]').exists()).toBeFalsy();
    });

    it('should render with "back"', () => {
      wrapper.setProps({
        offset: 10,
      });

      expect(wrapper.find('[data-test=pagination-next]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=pagination-prev]').exists()).toBeTruthy();
    });

    it('should render without "next"', () => {
      wrapper.setProps({
        offset: 10,
        limit: 10,
        total: 12,
      });

      expect(wrapper.find('[data-test=pagination-next]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=pagination-prev]').exists()).toBeTruthy();
    });

    it('should emit correct next offset', () => {
      wrapper.setProps({
        offset: 0,
        limit: 10,
      });

      wrapper.find('[data-test=pagination-next]').trigger('click');

      expect(wrapper.emitted().offset).toEqual([[10]]);
    });

    it('should emit correct prev offset', () => {
      wrapper.setProps({
        offset: 10,
        limit: 10,
        total: 12,
      });

      wrapper.find('[data-test=pagination-prev]').trigger('click');

      expect(wrapper.emitted().offset).toEqual([[0]]);
    });
  });
});

import { shallowMount } from '@vue/test-utils';

import VPagination from '@/components/VPagination';

describe('VPagination', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VPagination, {
      propsData: {
        offset: 0,
        limit: 10,
      },
    });
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should be a Vue component', () => {
      expect(wrapper.name()).toBe('VPagination');
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should be with default state', () => {
      wrapper.setProps({
        limit: 10,
        offset: 0,
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should be with pagesVisible', () => {
      wrapper.setProps({
        limit: 10,
        offset: 40,
        pagesVisible: 3,
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should be with defined total', () => {
      wrapper.setProps({
        limit: 10,
        offset: 50,
        pagesVisible: 3,
        total: 100
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should be with defined total in end', () => {
      wrapper.setProps({
        limit: 10,
        offset: 100,
        pagesVisible: 3,
        total: 100
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('behaviour next/prev buttons', () => {
    it('should render both directions', () => {
      expect(wrapper.find('[data-test=pagination-next]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=pagination-prev]').exists()).toBeTruthy();
    });

    it('should render with disabled "next"', () => {
      wrapper.setProps({
        limit: 5,
        offset: 10,
        total: 10,
      });

      expect(wrapper.find('[data-test=pagination-next]').attributes().disabled).toBeTruthy();
      expect(wrapper.find('[data-test=pagination-prev]').attributes().disabled).toBeFalsy();
    });

    it('should render with disabled "prev"', () => {
      wrapper.setProps({
        offset: 0,
        limit: 10,
        total: 12,
      });

      expect(wrapper.find('[data-test=pagination-next]').attributes().disabled).toBeFalsy();
      expect(wrapper.find('[data-test=pagination-prev]').attributes().disabled).toBeTruthy();
    });
  });

  describe('first and latest buttons', () => {
    beforeEach(() => {
      wrapper.setProps({
        offset: 0,
        limit: 10,
        total: 100,
      });
    });

    it('should not show first button', () => {
      wrapper.setProps({
        offset: 50,
      });

      expect(wrapper.find('[data-test=first-btn]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=latest-btn]').exists()).toBeFalsy();
    });

    it('should not show latest button', () => {
      wrapper.setProps({
        offset: 0,
      });

      expect(wrapper.find('[data-test=first-btn]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=latest-btn]').exists()).toBeFalsy();
    });

    it('should show only latest button', () => {
      wrapper.setProps({
        offset: 0,
        pagesVisible: 3,
      });

      expect(wrapper.find('[data-test=first-btn]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=latest-btn]').exists()).toBeTruthy();
    });

    it('should show first and latest button', () => {
      wrapper.setProps({
        offset: 50,
        pagesVisible: 3,
      });

      expect(wrapper.find('[data-test=first-btn]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=latest-btn]').exists()).toBeTruthy();
    });

    it('should show only first button', () => {
      wrapper.setProps({
        offset: 90,
        pagesVisible: 3,
      });

      expect(wrapper.find('[data-test=first-btn]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=latest-btn]').exists()).toBeFalsy();
    });
  });

  describe('events', () => {
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

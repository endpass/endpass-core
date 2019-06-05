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

      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeFalsy();
    });

    it('should not show latest button', () => {
      wrapper.setProps({
        offset: 0,
      });

      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeFalsy();
    });

    it('should show only latest button', () => {
      wrapper.setProps({
        offset: 0,
        pagesVisible: 3,
      });

      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeTruthy();
    });

    it('should show first and latest button', () => {
      wrapper.setProps({
        offset: 50,
        pagesVisible: 3,
      });

      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeTruthy();
    });

    it('should show only first button', () => {
      wrapper.setProps({
        offset: 90,
        pagesVisible: 3,
      });

      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeFalsy();
    });
  });

  describe('goto pages navigation', () => {
    it('should show only one page', () => {
      wrapper.setProps({
        offset: 0,
        pagesVisible: 5,
        total: 1,
      });

      expect(wrapper.findAll('[data-test=btn-goto-page]')).toHaveLength(1);
      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeFalsy();
    });

    it('should show only 3 page', () => {
      wrapper.setProps({
        offset: 0,
        pagesVisible: 5,
        total: 30,
      });

      expect(wrapper.findAll('[data-test=btn-goto-page]')).toHaveLength(3);
      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeFalsy();
    });

    it('should show only all 5 page', () => {
      wrapper.setProps({
        offset: 0,
        pagesVisible: 5,
        total: 300,
      });

      expect(wrapper.findAll('[data-test=btn-goto-page]')).toHaveLength(5);
      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeTruthy();
    });

    it('should show only all 5 page', () => {
      wrapper.setProps({
        offset: 100,
        pagesVisible: 5,
        total: 300,
      });

      expect(wrapper.findAll('[data-test=btn-goto-page]')).toHaveLength(5);
      expect(wrapper.find('[data-test=btn-goto-first]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=btn-goto-last]').exists()).toBeTruthy();
    });
  });

  describe('dots', () => {
    it('should not show dots', () => {
      wrapper.setProps({
        offset: 0,
        pagesVisible: 0,
        total: 1,
      });

      expect(wrapper.find('[data-test=dots-left]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=dots-right]').exists()).toBeFalsy();
    });

    it('should not show dots with one page', () => {
      wrapper.setProps({
        offset: 0,
        pagesVisible: 3,
        total: 1,
      });

      expect(wrapper.find('[data-test=dots-left]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=dots-right]').exists()).toBeFalsy();
    });

    it('should show only right dots', () => {
      wrapper.setProps({
        offset: 0,
        pagesVisible: 3,
        total: 100,
      });

      expect(wrapper.find('[data-test=dots-left]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test=dots-right]').exists()).toBeTruthy();
    });

    it('should show only left dots', () => {
      wrapper.setProps({
        offset: 90,
        pagesVisible: 3,
        total: 100,
      });

      expect(wrapper.find('[data-test=dots-left]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=dots-right]').exists()).toBeFalsy();
    });

    it('should show all dots', () => {
      wrapper.setProps({
        offset: 30,
        pagesVisible: 3,
        total: 100,
      });

      expect(wrapper.find('[data-test=dots-left]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=dots-right]').exists()).toBeTruthy();
    });

    it('should show all dots without total', () => {
      wrapper.setProps({
        offset: 30,
        pagesVisible: 3,
        total: 0,
      });

      expect(wrapper.find('[data-test=dots-left]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test=dots-right]').exists()).toBeTruthy();
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

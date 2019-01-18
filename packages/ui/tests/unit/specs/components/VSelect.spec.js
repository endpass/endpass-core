import { shallowMount } from '@vue/test-utils';

import VSelect from '@/components/VSelect';

describe('VSelect', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(VSelect);
  });

  it('should render props', () => {
    expect(wrapper.contains('label')).toBeFalsy();
    expect(wrapper.contains('option')).toBeFalsy();

    wrapper.setProps({
      options: ['option1', 'option2'],
      value: 'option1',
      label: 'Some Label',
    });

    expect(wrapper.find('label').text()).toBe('Some Label');
    expect(wrapper.findAll('option').length).toBe(2);
  });

  it('should emit event', () => {
    wrapper.find('select').trigger('change');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  describe('props', () => {
    describe('options', () => {
      describe('options are strings', () => {
        it('should correctly render options', () => {
          const options = ['option1', 'option2'];

          wrapper.setProps({ options });

          expect(wrapper.find('select').html()).toMatchSnapshot();
        });
      });

      describe('options are objects', () => {
        it('should correctly render text of options', () => {
          const options = [{ text: 'text' }, {}];

          wrapper.setProps({ options });

          expect(wrapper.find('select').html()).toMatchSnapshot();
        });

        it('should correctly render values of options', () => {
          const options = [{ val: 'val' }, {}];

          wrapper.setProps({ options });

          expect(wrapper.find('select').html()).toMatchSnapshot();
        });
      });

      describe('options have different types', () => {
        it('should correctly render options', () => {
          const options = [
            'option',
            { val: 'option value', text: 'option text' },
          ];

          wrapper.setProps({ options });

          expect(wrapper.find('select').html()).toMatchSnapshot();
        });
      });
    });
  });
});

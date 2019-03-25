import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MultiForm from '@/components/MultiForm.vue';
import { getters } from '../../src/store';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('MultiForm.vue', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      getInputKeys: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
    });
  });

  it('renders vue component successfully', () => {
    const wrapper = shallowMount(MultiForm, { store, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});

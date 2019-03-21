import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const formData = new FormData();

export default new Vuex.Store({
  state: {
    formData: formData,
  },
  mutations: {
    updateField(state, args) {
      const [ field, value ] = [...args];
      state[field] = value;
    }
  },
  actions: {
    triggerUpdateField({ commit }, args) {
      commit('updateField', args);
    }
  },
});

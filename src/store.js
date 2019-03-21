import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const formData = new FormData();

export default new Vuex.Store({
  state: {
    formData: formData,
    formInputs: {
      step1: {
        firstName: {
          label: 'First name',
          required: true,
          validationRules: [
            v => Boolean(v) || 'First Name is required',
          ],
          type: 'text',
          value: '',
        },
        lastName: {
            label: 'Last name',
            required: false,
            type: 'text',
            value: '',
        },
        email: {
            label: 'Email',
            required: true,
            validationRules: [
                v => Boolean(v) || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must be valid',
            ],
            type: 'text',
            value: '',
        },
        phoneNo: {
            label: 'Phone Number',
            required: false,
            type: 'text',
            value: '',
        },
        ukResident: {
            label: 'Do you live in the UK?',
            required: true,
            validationRules: [
              v => Boolean(v) || 'You must be a UK resident to apply!',
            ],
            type: 'checkbox',
            value: '',
        },
      },
      step2: {
        cv: {
          label: 'CV',
          required: true,
          validationRules: [
            v => Boolean(v) || 'CV is required',
          ],
          type: 'file',
          value: '',
        },
        cover: {
          label: 'Cover Letter',
          required: false,
          type: 'file',
          value: '',
        },
      },
      step3: {
        about: {
          label: 'About you',
          required: true,
          hint: 'Tell us some more about yourself',
          validationRules: [
            v => Boolean(v) || 'About text is required',
          ],
          type: 'textarea',
          value: '',
        },
      },
    },
  },
  getters: {
    getInputKeys: state => Object.keys(state.formInputs),
  },
  mutations: {
    updateField(state, args) {
      const [ field, value ] = [...args];
      state[field] = value;
    }
  },
  actions: {
    triggerUpdateField({ commit }, args) {
      console.log(args);
      commit('updateField', args);
    }
  },
});

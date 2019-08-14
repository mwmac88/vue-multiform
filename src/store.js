import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const URL_REGEX = /^((https?|http):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
const API_ENDPOINT = `${process.env.VUE_APP_ROOT}/.netlify/functions/apply`;
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
          datalabel: 'first_name',
        },
        lastName: {
          label: 'Last name',
          required: false,
          type: 'text',
          value: '',
          datalabel: 'last_name',
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
          datalabel: 'email',
        },
        phoneNo: {
          label: 'Phone Number',
          required: false,
          type: 'text',
          value: '',
          datalabel: 'phone_number',
        },
        gitProfile: {
          label: 'Git Profile',
          required: true,
          validationRules: [
            v => Boolean(v) || 'Git Profile is required',
            v => URL_REGEX.test(v) || 'Git Profile must be a valid url',
          ],
          type: 'text',
          value: '',
          datalabel: 'git_profile',
        },
        ukResident: {
          label: 'Do you live in the UK?',
          required: true,
          validationRules: [
            v => Boolean(v) || 'You must be a UK resident to apply!',
          ],
          type: 'checkbox',
          value: '',
          datalabel: 'live_in_uk',
        },
      },
      step2: {
        cv: {
          label: 'CV',
          btnlabel: 'Upload CV',
          required: true,
          validationRules: [
            v => Boolean(v) || 'CV is required',
          ],
          type: 'file',
          value: '',
          datalabel: 'cv',
        },
        cover: {
          label: 'Cover Letter',
          btnlabel: 'Upload Cover Letter',
          required: false,
          type: 'file',
          value: '',
          datalabel: 'cover_letter',
        },
      },
      step3: {
        about: {
          label: 'About you',
          required: true,
          hint: 'Tell us some more about yourself',
          validationRules: [
            v => Boolean(v) || 'About text is required',
            v => (v && v.length >= 100) || 'About text must be at least 100 characters',
          ],
          type: 'textarea',
          value: '',
          datalabel: 'about_you',
        },
      },
    },
    formSuccess: [],
    formErrors: [],
  },
  getters: {
    getInputKeys: state => Object.keys(state.formInputs),
  },
  mutations: {
    updateField(state, args) {
      const [ step, field, newValue ] = [...args];
      state.formInputs[step][field].value = newValue;
    },
  },
  actions: {
    triggerUpdateField({ commit }, args) {
      commit('updateField', args);
    },
    triggerCompleteForm({ dispatch, state }) {
      Object.values(state.formInputs).map(step => {
        Object.values(step).map(data => {
          console.log(data);
          // if (data.value) {
          // const val = typeof data.value === 'boolean' ? new Boolean(true) : data.value;
          state.formData.append(data.datalabel, data.value);
          // }
        });
      });
      dispatch('postFormData');
    },
    postFormData({ state }) {
      for (var pair of state.formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      axios({
        method: 'post',
        url: API_ENDPOINT,
        data: state.formData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
      })
        .then(response => {
        // HANDLE SUCCESS
          console.log('RESPONSE', response);
          state.formSuccess = response;
        })
        .catch(error => {
          state.formErrors = error.response;
        });
    },
  },
});

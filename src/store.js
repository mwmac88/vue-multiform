import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_ENDPOINT = 'https://recruitment-submissions.netsells.co.uk/api/vacancies/javascript-developer/submissions';
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
          ],
          type: 'textarea',
          value: '',
          datalabel: 'about_you',
        },
      },
    },
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
          if (data.value) {
            state.formData.append(data.datalabel, data.value);
          }
        });
      })
      dispatch('postFormData');
    },
    postFormData({ state }) {
      axios({
          method: 'post',
          url: API_ENDPOINT,
          data: state.formData,
          config: { headers: { 'X-Requested-With': 'XMLHttpRequest' } },
      })
      .then((response) => {
        //handle success
        console.log(response);
      })
      .catch((response) => {
          //handle error
          console.log(response);
      });
    }
  },
});

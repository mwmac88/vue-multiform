<template>
  <v-form ref="formstep3" v-model="valid">
    <input type="hidden" name="submit-application" value="submit-application" />
    <v-container>
      <v-layout row wrap>
        <v-flex v-for="(input, key, index) in formInputs.step3" :key="index" xs12>
          <v-textarea
            v-if="input.type === 'textarea'"
            v-model.lazy="input.value"
            counter
            auto-grow
            :label="input.label"
            :required="input.required"
            :rules="input.validationRules"
            :hint="input.hint"
            @input="updateVal(['step3', key, input.value])"
          />
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn color="primary" @click="validateStep">Submit</v-btn>

    <v-btn flat @click="$emit('previousStep')">Back</v-btn>

    <v-dialog v-model="showErrorDialog" width="500">
      <v-card>
        <v-card-title class="headline red lighten-2" primary-title>
          <h3>Form Errors</h3>
        </v-card-title>

        <v-card-text>
          <p>Please address the following errors in the form</p>
          <v-spacer />
          <div v-for="(error, index) in formErrors" :key="index">{{ error[0] }}</div>
          <v-btn @click="showErrorDialog = false">OK</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showSuccessDialog" width="500">
      <v-card>
        <v-card-title class="headline green lighten-2" primary-title>
          <h3>Success</h3>
        </v-card-title>

        <v-card-text>
          <p>Thanks {{ formInputs.step1.firstName.value }}! You have successfully submitted your application</p>
          <v-spacer />
          <v-btn class="blue" @click="showSuccessDialog = false">Done</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'step-about',
  data: () => ({
    valid: false,
    showErrorDialog: false,
    showSuccessDialog: false
  }),
  computed: {
    ...mapState({
      formInputs: 'formInputs',
      formErrors: 'formErrors',
      formSuccess: 'formSuccess',
    })
  },
  methods: {
    ...mapActions({
      updateVal: 'triggerUpdateField',
      formComplete: 'triggerCompleteForm'
    }),
    validateStep() {
      if (this.$refs.formstep3.validate()) {
        this.formComplete();
      }
    }
  },
  watch: {
    formErrors(newVal, oldVal) {
      this.showErrorDialog = true;
    },
    formSuccess(newVal, oldVal) {
      this.showSuccessDialog = true;
    }
  }
};
</script>

<style>
</style>

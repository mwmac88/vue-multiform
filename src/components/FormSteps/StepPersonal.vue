<template>
  <v-form ref="formstep1" v-model="valid">
    <v-container>
      <v-layout row wrap>
        <v-flex v-for="(input, key, index) in formInputs.step1" :key="index" xs12 sm6>
          <v-text-field
            v-if="input.type === 'text'"
            v-model.lazy="input.value"
            :label="input.label"
            :required="input.required"
            :rules="input.validationRules"
            @input="updateVal(['step1', key, input.value])"
          />
          <v-checkbox
            v-if="input.type === 'checkbox'"
            v-model="input.value"
            :label="input.label"
            :required="input.required"
            :rules="input.validationRules"
            @change="updateVal(['step1', key, input.value])"
          />
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn color="primary" @click="validateStep">Continue</v-btn>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'step-personal',
  data: () => ({
    valid: false
  }),
  computed: {
    ...mapState({
      formInputs: 'formInputs'
    })
  },
  methods: {
    ...mapActions({
      updateVal: 'triggerUpdateField'
    }),
    validateStep() {
      if (this.$refs.formstep1.validate()) {
        this.$emit('nextStep');
      }
    }
  }
};
</script>

<style>
</style>

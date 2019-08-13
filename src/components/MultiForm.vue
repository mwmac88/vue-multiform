<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-stepper v-model="activeStep">
            <v-stepper-header>
              <v-stepper-step
                v-for="(step, index) in steps"
                :key="index"
                :editable="index + 1 < activeStep"
                :complete="index + 1 < activeStep"
                :step="index + 1"
              >Step {{ index + 1 }}</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <StepPersonal @nextStep="nextStep" />
              </v-stepper-content>

              <v-stepper-content step="2">
                <StepFiles @nextStep="nextStep" @previousStep="previousStep" />
              </v-stepper-content>

              <v-stepper-content step="3">
                <StepAbout @previousStep="previousStep" />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import StepPersonal from './FormSteps/StepPersonal';
import StepFiles from './FormSteps/StepFiles';
import StepAbout from './FormSteps/StepAbout';

export default {
  name: 'multi-form',
  components: {
    StepPersonal,
    StepFiles,
    StepAbout
  },
  data: () => ({
    activeStep: 1
  }),
  computed: {
    ...mapGetters({
      steps: 'getInputKeys'
    })
  },
  methods: {
    nextStep() {
      this.activeStep++;
    },
    previousStep() {
      this.activeStep--;
    }
  }
};
</script>

<style>
</style>

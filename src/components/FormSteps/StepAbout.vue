<template>
    <v-form
        ref="formstep3"
        v-model="valid"
    >
        <v-container>
            <v-layout row wrap>
                <v-flex
                    v-for="(input, key, index) in formInputs.step3"
                    :key="index"
                    xs12
                >
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
        <v-btn color="primary" @click="validateStep">
            Submit
        </v-btn>

        <v-btn flat @click="$emit('previousStep')">
            Back
        </v-btn>

        <v-dialog v-model="showDialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    <h3>Form Errors</h3>
                </v-card-title>

                <v-card-text>
                    <p>Please address the following errors in the form</p>
                    <v-spacer />
                    <div v-for="(error, index) in formErrors" :key="index">
                        {{ error[0] }}
                    </div>
                    <v-btn @click="showDialog = false">
                        OK
                    </v-btn>
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
        showDialog: false,
    }),
    computed: {
        ...mapState({
            formInputs: 'formInputs',
            formErrors: 'formErrors',
        }),
    },
    methods: {
        ...mapActions({
            updateVal: 'triggerUpdateField',
            formComplete: 'triggerCompleteForm',
        }),
        validateStep() {
            if (this.$refs.formstep3.validate()) {
                this.formComplete();
            }
        },
    },
    watch: {
        formErrors(newVal, oldVal) {
            this.showDialog = true;
        }
    }
};
</script>

<style>

</style>

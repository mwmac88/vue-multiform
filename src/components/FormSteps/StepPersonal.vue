<template>
    <v-form
        ref="formstep1"
        v-model="valid"
    >
        <v-container>
            <v-layout row wrap>
                <v-flex
                    v-for="(input, key, index) in formInputs"
                    :key="index"
                    xs12 
                    sm6 
                    md3
                >
                    <v-text-field
                        v-if="input.type === 'text'"
                        :v-model="key"
                        :label="input.label"
                        :required="input.required"
                        :rules="input.validationRules"
                    />
                    <v-checkbox
                        v-if="input.type === 'checkbox'"
                        :v-model="key"
                        :label="input.label"
                        :required="input.required"
                        :rules="input.validationRules"
                    />
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn color="primary" @click="validateStep">
            Continue
        </v-btn>
    </v-form>
</template>

<script>
export default {
    name: 'step-personal',
    data: () => ({
        valid: false,
        formInputs: {
            firstName: {
                label: 'First name',
                required: true,
                validationRules: [v => !!v || 'First Name is required'],
                type: 'text',
            },
            lastName: {
                label: 'Last name',
                required: false,
                type: 'text',
            },
            email: {
                label: 'Email',
                required: true,
                validationRules: [
                    v => !!v || 'Email is required',
                    v => /.+@.+/.test(v) || 'Email must be valid',
                ],
                type: 'text',
            },
            phoneNo: {
                label: 'Phone Number',
                required: false,
                type: 'text',
            },
            ukResident: {
                label: 'Do you live in the UK?',
                required: true,
                validationRules: [v => Boolean(v) || 'You must be a UK resident to apply!'],
                type: 'checkbox',
            },
        },
    }),
    computed: {
        formInputStates: {
            get () {
                return Object.keys(this.formInputs).forEach(k => this.$store.state.k);
            },
            set (value) {
                Object.keys(this.formInputs).forEach(k => this.$store.dispatch('triggerUpdateField', [k, value]));
            }
        },
    },
    methods: {
        validateStep() {
            if (this.$refs.formstep1.validate()) {
                this.$emit('nextStep');
            }
        },
    },
};
</script>

<style>

</style>

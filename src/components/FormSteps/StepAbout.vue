<template>
    <v-form
        ref="formstep2"
        v-model="valid"
    >
        <v-textarea
            v-model="about"
            name="aboutyou"
            label="About You"
            hint="Tell us some more about yourself"
            required
            :rules="[v => !!v || 'About text is required']"
        />

        <v-btn color="primary" @click="validateStep">
            Submit
        </v-btn>

        <v-btn flat @click="$emit('previousStep')">
            Back
        </v-btn>
    </v-form>
</template>

<script>
export default {
    name: 'step-about',
    data: () => ({
        valid: false,
        about: '',
    }),
    methods: {
        validateStep() {
            if (this.$refs.formstep2.validate()) {
                this.$emit('formComplete');
            }
        },
    },
};
</script>

<style>

</style>

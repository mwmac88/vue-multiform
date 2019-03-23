<template>
  <v-form ref="formstep2">
    <v-flex
        v-for="(input, key, index) in formInputs.step2"
        :key="key"
        xs12
        ma-3
    >
        <v-btn
            v-if="input.type === 'file'"
            @click="openFileDialog(key)"
        >
            {{ input.btnlabel }}

            <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <input
            type="file"
            style="display:none"
            :ref="key"
            :rules="input.validationRules"
            :required="input.required"
            @change="onFileChange(key, $event)"
        >

      <v-spacer/>
    </v-flex>

    <v-spacer/>

    <v-flex v-if="uploadedFiles" xs12 ma-3>
      <v-chip v-for="(file, index) in uploadedFiles" :key="index">
        <v-avatar class="teal">
          <v-icon>attachment</v-icon>
        </v-avatar>
        File Uploaded: {{ file.value.name }}
      </v-chip>
    </v-flex>

    <v-btn color="primary" @click="validateStep">Continue</v-btn>

    <v-btn flat @click="$emit('previousStep')">Back</v-btn>

    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <h3>Upload a CV</h3>
        </v-card-title>

        <v-card-text>
          <p>You must upload a CV file to continue</p>
          <v-spacer/>
          <v-btn @click="showDialog = false">OK</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "step-files",
  data: () => ({
    showDialog: false,
  }),
  computed: {
    ...mapState({
      formInputs: "formInputs",
    }),
    uploadedFiles() {
        return Object.values(this.formInputs.step2).filter(files => Boolean(files.value));
    },
    hasUploadedCV() {
        return this.uploadedFiles.some(files => files.label === 'CV');
    }
  },
  methods: {
    ...mapActions({
        updateVal: "triggerUpdateField"
    }),
    validateStep() {
      if (!this.hasUploadedCV) {
        this.showDialog = true;
      } else {
        this.$emit("nextStep");
      }
    },
    openFileDialog(inputRef) {
        this.$refs[inputRef][0].click();
    },
    onFileChange(inputKey, e) {
        const fileUploaded = e.target.files || e.dataTransfer.files;
        const fileCount = fileUploaded.length;
        if (fileCount > 0) {
            this.updateVal(['step2', inputKey, fileUploaded[0]]);
        }
    },
  }
};
</script>

<style>
</style>

<template>
  <v-form ref="formstep2">
    <v-flex xs12 ma-3>
      <v-btn @click="openFileDialog('cvfileinput')">Upload CV
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
      <input
        ref="cvfileinput"
        type="file"
        style="display:none"
        :rules="[v => Boolean(v) || 'CV is required']"
        required
        @change="onFileChange('cv', $event)"
      >

      <v-spacer/>

      <v-btn @click="openFileDialog('coverfileinput')">Upload Cover Letter
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
      <input
        ref="coverfileinput"
        type="file"
        style="display:none"
        @change="onFileChange('cover', $event)"
      >
    </v-flex>

    <v-spacer/>

    <v-flex v-if="hasUploadedFile" xs12 ma-3>
      <v-chip v-for="(file, index) in uploadedFiles" :key="index">
        <v-avatar class="teal">
          <v-icon>attachment</v-icon>
        </v-avatar>
        File Uploaded: {{ file.name }}
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
import { mapActions } from 'vuex';

export default {
  name: 'step-files',
  data: () => ({
    showDialog: false,
    fileUploads: {
      cv: {},
      cover: {},
    },
  }),
  computed: {
    hasUploadedFile() {
      return Object.values(this.fileUploads).some(file => file.name);
    },
    uploadedFiles() {
      return Object.values(this.fileUploads).filter(file => Boolean(file.name));
    },
  },
  methods: {
    ...mapActions({
      updateVal: 'triggerUpdateField',
    }),
    validateStep() {
      if (!this.hasUploadedFile) {
          this.showDialog = true;
      } else {
          this.$emit('nextStep');
      }
    },
    openFileDialog(inputRef) {
      this.$refs[inputRef].click();
    },
    onFileChange(fileType, e) {
      const fileUploaded = e.target.files || e.dataTransfer.files;
      const fileCount = fileUploaded.length;
      if (fileCount > 0) {
        this.fileUploads[fileType] = fileUploaded[0];
      }
    },
  },
};
</script>

<style>
</style>

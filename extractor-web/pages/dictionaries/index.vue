<template>
  <v-container class="grey lighten-5">
    <v-container class="section-centered">
      <h2> DICTIONARIES </h2>
    </v-container>
    <v-form @submit.prevent="onSubmit">
      <v-container class="section-centered">
        <file-selector v-model="file" />
      </v-container>
      <v-container class="section-centered">
        <v-card-actions>
          <div class="my-8 d-flex justify-center justify-md-start">
            <v-btn rounded x-large type="submit" :loading="loading"> Submit </v-btn>
          </div>
        </v-card-actions>
      </v-container>
      <v-container class="section-centered">
        <v-alert v-if="this.loading" type="info" color="green-light">LOADING</v-alert>
        <v-alert v-if="this.uploadError" color="red" type="error">{{ this.uploadMessage }}</v-alert>
        <v-alert v-if="this.resultMessage.length > 0" type="success" color="green">{{
          this.resultMessage
        }}</v-alert>
      </v-container>
    </v-form>
  </v-container>
</template>

<style>
.section-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<script>
import FileSelector from '~/components/FileSelector';
import { mapActions } from 'vuex';

export default {
  components: {
    FileSelector,
  },

  data() {
    return {
      file: null,
      loading: false,
      uploadError: false,
      uploadMessage: '',
      resultMessage: '',
    };
  },

  methods: {
    ...mapActions('dictionaries', ['uploadDictionary']),
    async onSubmit() {
      this.resultMessage = '';
      this.uploadError = false;
      this.loading = true;
      await this.uploadDictionary({ file: this.file })
        .then((response) => {
          this.loading = false;
          this.setError(null);
          this.resultMessage = 'OK!';
        })
        .catch((e) => {
          this.loading = false;
          this.setError(e);
        });
    },
    setError(errorCode) {
      if (errorCode) {
        this.uploadError = true;
        this.uploadMessage = errorCode;
      }
    },
  },
};
</script>

<template>
  <div>
    DICTIONARIES
    <v-form @submit.prevent="onSubmit">
      <file-selector v-model="file" />

      <v-card-actions>
        <div class="my-8 d-flex justify-center justify-md-start">
          <v-btn color="secondary" rounded x-large type="submit" :loading="loading"> Submit </v-btn>
        </div>
      </v-card-actions>
      <div v-if="this.loading">LOADING</div>
      <div v-if="this.uploadError">{{ this.uploadMessage }}</div>
      <div v-else>{{ this.resultMessage }}</div>
    </v-form>
  </div>
</template>

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

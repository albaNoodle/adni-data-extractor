<template>
  <v-container class="grey lighten-5">
    <v-container class="section-centered">
      <h2> Extract Data </h2>
    </v-container>
    <v-container class="section-centered">
      <v-row class="mt-16" justify="center">
        <v-col mb="6">
          <v-card class="pa-2" outlined tile>
            <patients-selector @selectPatients="selectPatients" />
          </v-card>
        </v-col>
        <v-col mb="6">
          <v-card class="pa-2" outlined tile>
            <brain-parts-selector @selectBrainParts="selectBrainParts" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="section-centered">
      <v-btn :loading="creatingCsv" class="button--grey" @click="onCreateReport"
        >{{ creatingCsv ? 'Creating File' : 'Download Data' }}
      </v-btn>
    </v-container>
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
import PatientsSelector from '~/components/PatientsSelector.vue';
import BrainPartsSelector from '~/components/BrainPartsSelector.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    PatientsSelector,
    BrainPartsSelector,
  },

  data() {
    return {
      selectedPatients: [],
      selectedBrainParts: [],
      error: null,
      creatingCsv: false,
    };
  },

  // computed: {
  //   ...mapState('dictionaries', ['brainParts']),
  // },

  methods: {
    ...mapActions('extractor', ['getAdniData']),
    async selectPatients(value) {
      this.selectedPatients = value;
    },
    async selectBrainParts(value) {
      this.selectedBrainParts = value;
    },
    async onCreateReport() {
      this.creatingCsv = true;
      try {
        await this.downloadReport();
        // this.closeDialogDelayed(800)
      } catch (error) {
        this.creatingCsv = false;
        this.error = error.message || error.error || error.toString();
        console.error(error);
      }
    },
    async downloadReport() {
      const response = await this.getFileFromApi({
        patientsPtids: this.selectedPatients,
        phenotypes: this.selectedBrainParts,
      });
      this.saveBlobResponseDialog(response);
      this.creatingCsv = false;
    },
    async getFileFromApi(params) {
      return this.getAdniData(params);
      // return this.$axios.$post(`/api/adni-reader`, {
      //   params,
      //   responseType: 'blob',
      //   headers: { Accept: 'text/csv;*/*' },
      // })
    },
    saveBlobResponseDialog(response) {
      // const { data, body, type } = response;
      const fileURL = window.URL.createObjectURL(new Blob([response]));
      const fileName =
        // response.headers['content-disposition']
        //   ? response.headers['content-disposition'].slice(22, -1)
        //   :
        'report.csv';
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', fileName);
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
    },
  },
};
</script>

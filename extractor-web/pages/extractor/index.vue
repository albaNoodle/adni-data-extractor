<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters justify="center">
        <v-col md="4">
          <v-card class="pa-2" outlined tile>
            <!-- <v-card class="d-flex justify-space-between mb-6" :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'" flat tile> -->
            <patients-selector @selectPatients="selectPatients" />
            <!-- <v-card outlined tile> -->
          </v-card>
        </v-col>
        <v-col md="4">
          <v-card class="pa-2" outlined tile>
            <brain-parts-selector @selectBrainParts="selectBrainParts" />
          </v-card>
        </v-col>
        <!-- </v-card> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PatientsSelector from '~/components/PatientsSelector.vue';
import BrainPartsSelector from '~/components/BrainPartsSelector.vue';
// import { mapActions, mapState } from 'vuex';

export default {
  components: {
    PatientsSelector,
    BrainPartsSelector,
  },

  data() {
    return {
      selectedPatients: [],
      selectedBrainParts: [],
    };
  },

  // computed: {
  //   ...mapState('dictionaries', ['brainParts']),
  // },

  methods: {
    // ...mapActions('dictionaries', ['getBrainParts']),
    async selectPatients(value) {
      this.selectedPatients = value;
    },
    async selectBrainParts(value) {
      this.selectedBrainParts = value;
    },
  },
};
</script>

<template>
  <div>
    <v-container class="grey lighten-5">
      <div class="section-title">
        <h2> Extract Data </h2>
      </div>
      <v-row no-gutters justify="center">
        <v-col md="4">
          <v-card class="pa-2" outlined tile>
            <patients-selector @selectPatients="selectPatients" />
          </v-card>
        </v-col>
        <v-col md="4">
          <v-card class="pa-2" outlined tile>
            <brain-parts-selector @selectBrainParts="selectBrainParts" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- {{ selectedPatients }}-->
    <!-- {{ selectedBrainParts }} -->
  </div>
</template>

<style>
.section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

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

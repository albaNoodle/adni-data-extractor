<template>
  <div>
    <h4>Patients</h4>
    <div>
      <v-card elevation="16" max-width="400" class="mx-auto">
        <v-checkbox v-model="allSelected" @click="selectAll" :label="`Select All`" />
      </v-card>

      <v-card elevation="16" max-width="400" class="mx-auto">
        <v-virtual-scroll :items="patients" height="300" item-height="64">
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-list-item-content>
                <v-checkbox v-model="patientPtids" @click="select" :value="item.ptid" :label="`${item.rid}  - ${item.ptid}`" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
    </div>

    <button class="button--grey" @click="emitToParent">Upload Patients</button>

    <!-- <span>Selected Ids: {{ patientPtids }}</span> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      // patients: [],
      selected: [],
      allSelected: false,
      patientPtids: [],
      checked: false,
    };
  },
  computed: {
    ...mapState('patients', ['patients']),
  },

  async fetch() {
    await Promise.all([this.getPatients({ rid: -1 })]);
  },

  methods: {
    ...mapActions('patients', ['getPatients']),
    async loadData() {
      await Promise.all([this.getPatients({ rid: -1 })]);
    },
    selectAll() {
      this.patientPtids = [];

      if (this.allSelected) {
        //value before updates
        for (let id in this.patients) {
          this.patientPtids.push(this.patients[id].ptid);
        }
      }
    },
    select() {
      this.allSelected = false;
    },
    emitToParent(event) {
      this.$emit('selectPatients', this.patientPtids);
    },
  },
};
</script>

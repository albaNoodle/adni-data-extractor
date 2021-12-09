<template>
  <div>
    <h4>Patients</h4>
    <div>
      <v-card elevation="16" class="mx-auto">
        <v-text-field
          v-model="search"
          placeholder="Search"
          prepend-inner-icon="mdi-account-search"
          class="px-3 v-input--no-border"
          dense
          flat
          hide-details
          single-line
        ></v-text-field>
      </v-card>

      <v-card elevation="16" class="mx-auto">
        <v-checkbox v-model="allSelected" @click="selectAll" :label="`Select All`" />
      </v-card>

      <v-card elevation="16" class="mx-auto">
        <v-virtual-scroll :items="filteredPatients" height="300" item-height="64">
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-list-item-content>
                <v-checkbox
                  v-model="patientPtids"
                  @click="select"
                  :key="item.ptid"
                  :value="item.ptid"
                  :label="`${item.rid} - ${item.ptid}`"
                />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
    </div>

    <!-- <button class="button--grey" @click="emitToParent">Upload Patients</button> -->
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
      search: '',
    };
  },
  computed: {
    ...mapState('patients', ['patients']),
    filteredPatients() {
      if (this.search) {
        this.allSelected = false;
        const term = this.search.toLowerCase();
        return this.patients.filter((c) => {
          // TODO: should be locale aware
          return c.ptid.toLowerCase().includes(term) || c.rid.toString().includes(term);
        });
      } else {
        return this.patients;
      }
    },
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
        for (let id in this.filteredPatients) {
          this.patientPtids.push(this.filteredPatients[id].ptid);
        }
      }

      this.emitToParent();
    },
    select() {
      this.allSelected = false;
      this.emitToParent();
    },
    emitToParent(event) {
      this.$emit('selectPatients', this.patientPtids);
    },
  },
};
</script>

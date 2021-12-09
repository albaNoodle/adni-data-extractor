<template>
  <div>
    <h4>Brain Parts</h4>
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
        <v-checkbox v-model="allSelected" @change="selectAll" :label="`Select All`" />
      </v-card>

      <v-card elevation="16" class="mx-auto">
        <v-virtual-scroll :items="filteredBrainParts" height="300" item-height="64">
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-list-item-content>
                <v-checkbox
                  v-model="brainPartsKeynames"
                  @click="select"
                  :key="item.bp_keyname"
                  :value="item.bp_keyname"
                  :label="`${item.bp_keyname}  - ${item.bp_humanName}`"
                />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
    </div>

    <!-- <button class="button--grey" @click="emitToParent">Select barin parts</button> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      allSelected: false,
      brainPartsKeynames: [],
      checked: false,
      search: '',
    };
  },
  computed: {
    ...mapState('dictionaries', ['brainParts']),
    filteredBrainParts() {
      if (this.search) {
        this.allSelected = false;
        const term = this.search.toLowerCase();
        return this.brainParts.filter((c) => {
          // TODO: should be locale aware
          return (
            c.bp_humanName.toLowerCase().includes(term) || c.bp_keyname.toLowerCase().includes(term)
          );
        });
      } else {
        return this.brainParts;
      }
    },
  },

  async fetch() {
    await Promise.all([this.getBrainParts()]);
  },
  methods: {
    ...mapActions('dictionaries', ['getBrainParts']),

    selectAll() {
      this.brainPartsKeynames = [];

      if (this.allSelected) {
        //value before updates
        for (let id in this.filteredBrainParts) {
          this.brainPartsKeynames.push(this.filteredBrainParts[id].bp_keyname);
        }
      }

      this.emitToParent();
    },
    select() {
      this.allSelected = false;
      this.emitToParent();
    },
    emitToParent(event) {
      this.$emit('selectBrainParts', this.brainPartsKeynames);
    },
  },
};
</script>

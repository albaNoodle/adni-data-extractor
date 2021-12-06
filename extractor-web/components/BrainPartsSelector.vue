<template>
  <div>
    <h4>Brain Parts</h4>
    <div>
      <v-card elevation="16" max-width="400" class="mx-auto">
        <v-checkbox v-model="allSelected" @click="selectAll" :label="`Select All`" />
      </v-card>

      <v-card elevation="16" max-width="400" class="mx-auto">
        <v-virtual-scroll :items="brainParts" height="300" item-height="64">
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-list-item-content>
                <v-checkbox
                  v-model="brainPartsKeynames"
                  @click="select"
                  :value="item.bp_keyname"
                  :label="`${item.bp_keyname}  - ${item.bp_humanName}`"
                />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
    </div>

    <button class="button--grey" @click="emitToParent">Select barin parts</button>
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
    };
  },
  computed: {
    ...mapState('dictionaries', ['brainParts']),
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
        for (let id in this.brainParts) {
          this.brainPartsKeynames.push(this.brainParts[id].keyname);
        }
      }
    },
    select() {
      this.allSelected = false;
    },
    emitToParent(event) {
      this.$emit('selectBrainParts', this.brainPartsKeynames);
    },
  },
};
</script>

<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Capture A Crop</h3>
        <v-autocomplete
        @input="setSelection"
          label="Crop Category"
          :items="cropTypes"
          v-model="crop.category"
        ></v-autocomplete>
        <v-autocomplete v-if="vegOptions !== null && crop.category"
          label="Crop Name"
          :items="cropNames"
          v-model="crop.name"
        ></v-autocomplete>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="crop.description"
              name="description"
              label="How About a short Description of the produce?"
              id="id"
            ></v-text-field>
          </v-flex>
            <v-flex xs12>
                <h4 class="mb-1">Harvest Window</h4>
                <p class="font-weight-light mb-1" >Over what period of time do you expect to be harvesting the crop?</p>        
            </v-flex>
            <v-flex xs6>
                <v-menu
                ref="startDate"
                :close-on-content-click="false"
                v-model="dateOne"
                :return-value.sync="crop.startDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="crop.startDate"
                    label="End"
                    prepend-icon="fa-calendar"
                    readonly
                ></v-text-field>
                <v-date-picker v-model="crop.startDate" @input="$refs.startDate.save(crop.startDate)"></v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs6>
                <v-menu
                ref="endDate"
                :close-on-content-click="false"
                v-model="dateTwo"
                :return-value.sync="crop.endDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="crop.endDate"
                    label="Start"
                    prepend-icon="fa-calendar"
                    readonly
                ></v-text-field>
                <v-date-picker v-model="crop.endDate" @input="$refs.endDate.save(crop.endDate)"></v-date-picker>
                </v-menu>
            </v-flex>  
                <v-btn @click="saveCrop" color="success">Save</v-btn>
            <template v-if="currentCrops.length > 0">
                <br>
                <br>
              <v-card>
                <v-card-title class="display-1" primary-title>
                  Scheduled Crops
                </v-card-title>
                <v-card-text>
                  <v-flex xs12 v-for="(crop, index) in currentCrops" :key="index">
                    Name: {{crop.name}}
                    Category: {{crop.category}}
                    Description: {{crop.description}}
                    Harvest Begins: {{crop.harvestWindow.from}}
                    Harvest Ends: {{crop.harvestWindow.to}}
                  </v-flex>
                </v-card-text>
              </v-card>
            </template>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("getCropNames")
    this.setSelection()
    this.$store.dispatch("fetchCrops");
  },

  data() {
    return {
      cropTypes: ["VEGETABLE", "HERB", "FRUIT"],
      cropNames: ["bean", "spinach", "carrot"],
      // crop: {
      //   category: null,
      //   name: null,
      //   description: null,
      //   startDate: null,
      //   endDate: null
      // },
      dateOne: false,
      dateTwo: false
    };
  },

  computed: {
    vegOptions() {
      return this.$store.getters.vegOptions;
    },
    currentCrops() {
      return this.$store.getters.crops;
    },
    crop: {
      get() {
        return this.$store.getters.crop
      },
      set(val) {
        this.$store.commit('crop', val)
      }
    }
  },
  
  methods: {
    setSelection() { // modify the available options based on the previous selection
      this.cropNames = this.vegOptions.filter(row => {
        return row.type === this.crop.category;
      }).map(function(row) {
        return row.name;
      });
    },
    async saveCrop() {
      await this.$store.dispatch("saveCrop", this.crop);
            this.$router.push('/')
    }
  }
};
</script>


<template>
  <div>
    <v-select
        label="Farming Activities"
        :items="activitiesSelection"
        v-model="farmingActivities.category"

        hint="Whichever best describes your operation"
        persistent-hint
    ></v-select>
    <v-autocomplete
      label="Cultivation Approach"
      :items="cultivationSelection"
      v-model="farmingActivities.cultivationApproach"
    ></v-autocomplete>
    <br>
    <p>What kind of things do you do? That is: What would you want to sell via our network?</p>        
    <v-checkbox label="I grow crops" 
      v-model="farmingActivities.selling" value="crops"></v-checkbox>
    <v-checkbox label="I raise livestock" 
      v-model="farmingActivities.selling" value="livestock"></v-checkbox>
    <v-checkbox label="I value-add and have crafts or products to sell" 
      v-model="farmingActivities.selling" value="products"></v-checkbox>
    <v-textarea
        v-model="farmingActivities.shortDescription"
        label="Care to go into more detail?"
    ></v-textarea>
    <v-btn
        color="primary"
        @click="submit()"
    >
    Save Draft
    </v-btn>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.getters.farmingActivities !== null) {
      this.farmingActivities = this.$store.getters.farmingActivities;
    }
  },
  data() {
    return {
      cultivationSelection: [
        "Organic",
        "Certified Organic",
        "Some Chemicals Used",
        "Fully Chemical Approach"
      ],
      activitiesSelection: ["Commercial", "Semi-Commercial", "Market-Farmer"],
      farmingActivities: {
        category: "",
        shortDescription: "",
        cultivationApproach: "",
        selling: ['crops']
      }
    };
  },
  methods: {
    submit() {
      this.$store.commit("farmingActivities", this.farmingActivities);
      this.$store.dispatch("changeElement", 4);
      this.$store.commit("draftDone", true);
    }
  }
};
</script>



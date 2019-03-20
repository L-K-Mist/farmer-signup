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
    <v-checkbox label="I grow crops" v-model="farmingActivities.selling.crops"></v-checkbox>
    <v-checkbox label="I raise livestock" v-model="farmingActivities.selling.livestock"></v-checkbox>
    <v-checkbox label="I value-add and have crafts or products to sell" v-model="farmingActivities.selling.products"></v-checkbox>
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
// import { FARMINGACTIVITIES_MUTATION } from "@/graphql/mutations";
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
        selling: {
          crops: true,
          livestock: false,
          products: false
        }
      }
    };
  },
  // computed: {
  //   storedActivities() {
  //     return this.$store.getters.farmingActivities
  //   }
  // },
  methods: {
    submit() {
      this.$store.dispatch("farmingActivities", this.farmingActivities);
      this.$store.dispatch("changeElement", 4);
      this.$store.dispatch("draftDone", true);
    }
  }
  // watch: {
  //   storedActivities(newVal){
  //     if (newVal !== null) {
  //       this.activities = newVal.category
  //       this.longDescription = newVal.longDescription
  //       this.crops = newVal.selling.crops
  //       this.livestock = newVal.selling.livestock
  //       this.products = newVal.selling.products
  //     }
  //   }
  // }
  // submit() {
  //   this.$store.dispatch('farmingActivities', {
  //         category: this.activities,
  //         shortDescription: null,
  //         longDescription: this.longDescription
  //       })
  //   this.$apollo
  //     .mutate({
  //       mutation: FARMINGACTIVITIES_MUTATION,
  //       variables: {
  //         category: this.activities,
  //         shortDescription: null,
  //         longDescription: this.longDescription
  //       }
  //     })
  //     .then(response => {
  //       console.log("​response.data", response.data);
  //     })
  //     .catch(error => console.error(error));
  // }
};
</script>



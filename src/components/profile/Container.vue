<template>
  <v-layout row justify-center>
    <v-flex v-if="name !== null" xs12 sm8 lg4 xl4>
      <br>
      <v-card v-show="draftDone">
        <v-card-text xs12>
          <strong>Check your work</strong>  This draft is saved locally on your machine. When you're ready to share it online, click 
          "SEND"
          <v-btn @click="sendOnline()" color="success">send</v-btn>
        </v-card-text> 
      </v-card>
      <br>
      <v-stepper :non-linear="stepsEditable" :value="el" vertical>
        <v-card-title primary-title>
          <h2>Farmer Profile</h2>
        </v-card-title>
        <v-stepper-step :editable="stepsEditable" :complete="personalDetails 
        !== null" step="1">
          Who You Are
          <small>So {{ name }}, tell us a bit about yourself</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <personal-details></personal-details>
        </v-stepper-content>
        <v-stepper-step :editable="stepsEditable" :complete="address 
        !== null" step="2">Where You Are</v-stepper-step>
        <v-stepper-content step="2">
          <address-details></address-details> 
        </v-stepper-content>
        <v-stepper-step :editable="stepsEditable" :complete="farmingActivities 
        !== null" step="3">What You Do</v-stepper-step> 
        <v-stepper-content step="3">
          <farming-activities></farming-activities>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import PersonalDetails from "@/components/profile/PersonalDetails";
import AddressDetails from "@/components/profile/Address";
import FarmingActivities from "@/components/profile/FarmingActivities";

export default {
  mounted() {
    console.log("onCreated el is: ", this.el);
    this.elGood = true;
    var stepperData = this.stepperData;
    console.log("TCL: ----------------------------------------");
    console.log("TCL: mounted -> stepperData", stepperData);
    console.log("TCL: ----------------------------------------");
  },
  data() {
    return {
      stepsEditable: false
      // me: "",
    };
  },
  computed: {
    el: {
      get() {
        return this.$store.getters.element;
      },
      set(value) {
        return this.$store.dispatch("changeElement", value);
      }
    },
    name() {
      return this.$store.getters.authUser.first_name
    },
    draftDone() {
      return this.$store.getters.draftDone;
    },
    personalDetails() {
      return this.$store.getters.personalDetails
    },
    address() {
      return this.$store.getters.address
    },
    farmingActivities() {
      return this.$store.getters.farmingActivities
    }
  },
  methods: {
    async sendOnline() {
      console.log("TCL: -----------------------------------------");
      console.log("TCL: sendOnline -> sendOnline");
      console.log("TCL: -----------------------------------------");
      await this.$store.dispatch("sendProfile");
      console.log("after await dispatch sendProfile")
      this.$router.push('/')
    }
  },
  watch: {
    draftDone(newVal) {
      console.log("TCL: ---------------------------------");
      console.log("TCL: draftDone -> newVal", newVal);
      console.log("TCL: ---------------------------------");
      this.stepsEditable = newVal;
    }
  },

  components: {
    PersonalDetails,
    AddressDetails,
    FarmingActivities
  }
};
</script>



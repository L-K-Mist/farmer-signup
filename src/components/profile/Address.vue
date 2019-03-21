<template>
  <div>
    <v-text-field
        label="Address Line 1"
        hint="Required of you want to sell through us"
        v-model="address.line1"
    ></v-text-field>   
    <v-text-field
        label="Address Line 2"
        hint="Required of you want to sell through us"
        v-model="address.line2"
    ></v-text-field>     
    <v-text-field
        label="Address Line 3"
        v-model="address.line3"
    ></v-text-field>
    <v-text-field
        label="Area"
        v-model="address.area"
    ></v-text-field>   
    <v-text-field
        label="Postal Code"
        v-model="address.postalCode"
        :counter="4"
        mask="####"
    ></v-text-field>
    <v-select
        :items="provinces"
        v-model="address.province"
        label="Select your province"
        single-line
    ></v-select>                  
    <v-btn
        color="primary"
        @click="$store.dispatch('changeElement', 3); submit()"
      >
        Save Draft
    </v-btn>    
  </div>
</template>

<script>
import db from "@/api/pouchDB";

export default {
  mounted() {
    if(this.storedAddress){
      this.address = this.storedAddress
    }
  },
  data: () => ({
    address: {
      line1: null,
      line2: null,
      line3: null,
      area: null,
      postalCode: null,
      province: null
    },

    provinces: [
      "Eastern Cape",
      "Free State",
      "Gauteng",
      "KwaZulu-Natal",
      "Limpopo",
      "Mpumalanga",
      "North West",
      "Northern Cape",
      "Western Cape"
    ]
  }),
  computed: {
    storedAddress() {
      this.$store.getters.address
    }
  },
  methods: {
    submit() {
      this.$store.commit('address', this.address)
    }
  },
  watch: {

  }
};

</script>
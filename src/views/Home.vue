<template>
  <v-container grid-list-lg fluid>
    <v-layout justify-center row wrap>
      <v-flex xs12 sm10 md8 lg6 xl4  >
        <v-tooltip bottom>
          <v-btn slot="activator" color="success" @click="testFunc">Dilly-Dee's function tester - DO NOT PRESS</v-btn>
          <span>HEY, DON'T BE A HERO!!</span> 
        </v-tooltip>
        <v-btn to="/profile" 
          block color="primary" dark>My Profile</v-btn>
        <v-btn to="/farm-profile" 
          block color="primary" dark>The Farm</v-btn>
        <v-btn to="/crop-capture" v-if="farmProfile !== null && farmingActivities.sellingWhat.includes('crops') == true"
          block color="primary" dark>Capture A Crop</v-btn>
        <v-btn to="/products" v-if="farmProfile !== null && farmingActivities.sellingWhat.includes('products') == true"
          block color="primary" dark>Our Products</v-btn>
        <!-- <v-btn block color="primary" dark>Our Livestock</v-btn> -->
        <br>
        <v-btn @click="logout" block color="secondary" dark>Log Out</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// TODO refactor boolean's above
export default {
  methods: {
    logout() {
      // TODO
    },
    async testFunc() {
      alert("You fucking PRESSED It didn't you!!!")
      const message = await this.$store.dispatch('fetchProducts')
			console.log('TCL: testFunc -> message', message)
    }
  },
  computed: {
    // TODO DB Data
    farmingActivities(){
      return {
        scale: "Commercial",
        cultivationApproach: "Organic",
        sellingWhat: ['crops', 'products'],

      }
    },
    farmProfile() {
      return 
        'coming soon'
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
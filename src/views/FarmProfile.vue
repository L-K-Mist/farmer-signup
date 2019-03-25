<template>
    <v-container grid-list-xs>
        <h3 v-if="farmProfile.name === null" class="display-1">Farm Profile</h3>
        <h3 v-else class="display-1">Farm Profile: {{farmProfile.name}}</h3>
         <v-text-field
        v-model="farmProfile.name"
        label="Farm's Name"
        required
        ></v-text-field>       
        <v-text-field
        v-model="farmProfile.totalLand"
        label="Total Arable Land in Square Meters"
        required
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.cultivatedLand"
        label="Land under cultivation in Square Meters"
        required
        ></v-text-field>
        <v-checkbox label="Do you want to show your location on Kandu Community?" 
        v-model="farmProfile.shareLocation"></v-checkbox>
        <p class="font-weight-light" >If you're near your farm now, please click the button below, accept location discovery, and then move the marker to a nice central spot on your land.</p>
        <v-btn @click="alternatively=false; getGPS()" color="info">Find Me</v-btn>
        <farm-map v-if="showFarmMap"></farm-map>
        <p v-if="municipalData.province">{{municipalData.province}} | {{municipalData.ward}}</p>
        <p class="font-weight-light" v-if="alternatively">Alternatively - if you already know your GPS co-ordinates by heart you can just type them in here (You crazy beautiful, savant you...)</p>
        <v-text-field
        v-model="farmProfile.gpsPoints.lat"
        label="Latitude"
        required
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.gpsPoints.lng"
        label="Longitude"
        required
        ></v-text-field>

        <v-text-field
        v-model="farmProfile.farmersAssociations"
        label="If you belong to any Farmer's Associations or groups please add them here"
        required
        ></v-text-field>
        <v-btn @click="saveFarmProfile" color="success">Save</v-btn>
    </v-container>
</template> 

<script>
// TODO: Move to HelperFunctions
import FarmMap from "@/components/profile/FarmMap";

export default {
  mounted() {
    //this.fetchFarm()
		console.log("TCL: mounted -> this.$store.getters.farmProfile", this.$store.getters.farmProfile)
    var other = this.$store.state.FarmProfile
		console.log("TCL: mounted -> other", other)
    
    this.farmProfile = this.$store.getters.farmProfile
  },
  data() {
    return {
      alternatively: true,
      farmProfile: {
        name: null,
        totalLand: "",
        cultivatedLand: "",
        gpsPoints: {
          lat: null,
          lng: null
        },
        farmersAssociations: "",
        shareLocation: true
      }
    };
  },
  computed: {
    showFarmMap: {
      get() {
        return this.$store.getters.showFarmMap;
      },
      set(val) {
        this.$store.dispatch("showFarmMap", val);
      }
    },

    municipalData() {
      return this.$store.getters.municipalData;
    }
  },
  methods: {
    getGPS() {
      var that = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => { // TODO see if the that to this trick is now not needed because of ES6 style func 
          // Get the coordinates of the current possition.
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          that.farmProfile.gpsPoints = {
            lat,
            lng
          };
          that.$store.dispatch("setFarmLocation", that.farmProfile.gpsPoints);
          that.$store.dispatch("showFarmMap", true);
          console.log(
            "TCL: getGPS -> this.farmProfile.gpsPoints",
            that.farmProfile.gpsPoints
          );
        });
      } else {
        console.log("Geo Location not supported by browser");
      }
    },
    async saveFarmProfile() {
      this.$store.commit('farmProfile', this.farmProfile)
      // await this.$store.dispatch("saveFarmProfile", this.farmProfile);
      this.$router.push('/')
    },
    async fetchFarm() {
      const response = await this.$store.dispatch('fetchMyFarm')
      this.farmProfile = {...response}
    }
  },
  components: {
    FarmMap
  }
};
</script>

<style>
</style>


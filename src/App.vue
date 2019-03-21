<template>
  <v-app id="inspire">
    <v-navigation-drawer
    style="z-index: 15"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/login">
          <v-list-tile-action>
            <v-icon>fa-sign-in</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logoff">
          <v-list-tile-action>
            <v-icon>fa-sign-out</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Off</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="testFunc()">
          <v-list-tile-action>
            <v-icon>fa-sign-out</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dylan's Function Testing Button</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar scroll-off-screen :scroll-threshold="50" color="indigo" dark fixed app style="z-index: 14">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="ml-1">Farmer App</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <transition 
        class="elevation-24"
          enter-active-class="delay animated rollIn"
          leave-active-class="animated hinge slow"
          >
                            <v-avatar @click="gotoMyStall" v-if="person.image && isLoggedIn" :style="avatarStyle" class=" elevation-6 "
                            :size="avatarSize"
                            color="grey lighten-4"
                            >
                                <img  :src="person.image"/>
                               
                            </v-avatar>

      </transition> -->
      <v-icon medium hint="logout" @click="logoff">fa-sign-out</v-icon>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-content>
    <v-footer color="indigo" absolute app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>


import { logout, initSession, auth0 } from "@/session";

export default {
  created() {
  },
  mounted() {
    initSession().then(() => {
      if (this.isLoggedIn) {
        console.log("I was called in app.vue after initSession resolved");
        this.$store.dispatch("hasuraAuth");
      }
    }); //Initialize our session
    
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    avatarStyle: {
      position: "absolute",
      top: "40px",
      right: "40px",
      cursor: "pointer"
    },
    avatarSize: "12vw"
  }),
  computed: {
    person() {
      return this.$store.getters.person;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name;
    }
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        this.$nextTick(async () => {
          await this.$store.dispatch("hasuraAuth");
        });
      }
    },
    breakpoint(newVal) {
      // this.$store.dispatch("viewPort", newVal);
      console.log("​breakpoint -> newVal", newVal);
    }
  },
  methods: {
    gotoMyStall() {
      this.$router.push("/my-stall");
    },
    logoff() {
      logout();
    },
    testFunc() {
      console.log("​testFunc -> testFunc");
      // this.$store.dispatch('testHasura')
      auth0.checkSession({
            // responseType: "token id_token"
        }, function (err, authResult) {
            console.log("​checkSession's authResult", authResult)

            // if (err) {
            //     store.dispatch("isLoggedIn", false)
            //     // router.push("/login");
            // }
            // store.commit("update_auth_tokens", authResult);
            // const tokenExpiryDate = addSeconds(new Date(), authResult.expiresIn);
            // const tenMinutesBeforeExpiry = subtractMinutes(tokenExpiryDate, 10);
            // const now = new Date();
            // refreshTimeout = setTimeout(refreshTokens, differenceInMilliSeconds(tenMinutesBeforeExpiry, now));
            resolve();
        });
    }
  }
};
</script>
<style>
#avatar {
  position: absolute;
  top: 20px;
  right: 40px;
  cursor: pointer;
}
.ufo {
  width: 30px;
  position: relative;
  top: 5px;
}
.text-shadow {
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
}
.delay {
  animation-delay: 3s;
}
</style>


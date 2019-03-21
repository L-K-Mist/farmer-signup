<template>
  <v-container>

    <profile-container v-if="ready"></profile-container>
  </v-container>
</template>

<script>
import ProfileContainer from "@/components/profile/Container";

export default {
  computed: {
    ready() {
      return this.$store.getters.docsIsInitialized;
    }
  },
  components: {
    ProfileContainer
  }
};
</script>



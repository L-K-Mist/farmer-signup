<template>
    <div>
    </div>
</template>

<script>
import { auth0 } from "@/session.js";
export default {
  name: "Login",
  mounted() {
    console.log("Login triggered");
    auth0.authorize();
  }
};
</script>

<style scoped>
</style>
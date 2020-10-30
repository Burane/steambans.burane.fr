<template>
  <div class="container-fluid" id="app">
    <filterBar v-on:update="setAllProfiles" />

    <div class="center-align">
      <h1>Steam Bans Monitor</h1>
      <p>Built with Nest.js, Vue.js and MongoDB</p>
    </div>

    <createProfile v-on:profileAdded="setAllProfiles" />

    <router-view name="homePage" />
  </div>
</template>

<script>
import M from "materialize-css";
import FilterBar from "@/components/filterBar/FilterBar";
import CreateProfile from "@/components/profile/Create";
import { mapActions } from "vuex";

export default {
  components: {
    CreateProfile,
    FilterBar,
  },
  mounted() {
    M.AutoInit();
  },
  methods: mapActions(["setAllProfiles", "setBannedProfiles"]),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

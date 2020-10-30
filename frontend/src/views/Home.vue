<template>
  <div>
    <section class="row">
      <div class="container">
        <div class="col s12 m3" v-for="profile in profiles" :key="profile._id">
          <profileCard v-on:profileDeleted="setProfiles" :profile="profile" />
        </div>
        <div v-if="profiles.length === 0 || !profiles">
          <h2>No profile found at the moment</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProfileCard from "@/components/profile/Card";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ProfileCard,
  },
  computed: {
    ...mapState("profiles", ["profiles", "parameter"]),
  },

  created() {
    this.setParameter(this.$route.params.param ?? "all");
    this.setProfiles();
  },

  methods: {
    ...mapActions("profiles", ["setProfiles", "setParameter"]),
  },

  watch: {    
    // here we need to not use arrow function
    "$route.params.param": function (param) {
      this.setParameter(param ?? "all");
      this.setProfiles();
    },
  },
};
</script>



<template>
  <div class="container container-base form-group">
    <form id="create-post-form" class @submit.prevent="__createProfile">
      <div class="form-group row">
        <div class="col-10">
          <input
            type="text"
            id="Steam_profile_url"
            v-model="Steam_profile_url"
            name="Steam_profile_url"
            class="form-control"
            placeholder="Copy and paste a steam profile link"
          />
        </div>
        <button class="btn btn-success mb-2" type="submit">Add Profile</button>
      </div>
    </form>
  </div>
</template>

<script>  
import { mapActions } from "vuex";

export default {
  data() {
    return {
      Steam_profile_url: "",
    };
  },
  methods: {
    __createProfile() {
      let data = {
        userLink: this.Steam_profile_url,
      };
      this.createProfile(data);
      this.Steam_profile_url = "";
    },
    ...mapActions("profiles", ["createProfile","setProfiles"]),
  },
};
</script>
<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a class="brand-logo">Steam Bans Monitor</a>
        <ul class="right hide-on-med-and-down">
          <li>
            <a ref="filters" class="dropdown-trigger" data-target="filters">
              <i class="material-icons right">arrow_drop_down</i>
              Filtre
            </a>
          </li>
          <li>
            <a v-on:click="setProfiles()">
              <i class="material-icons">refresh</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <ul id="filters" class="dropdown-content">
      <li>
        <router-link :to="{ name: 'home', params: { param: 'all' } }"
          >Tous</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'home', params: { param: 'banned' } }"
          >Bannis</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import M from "materialize-css";
import { mapActions } from "vuex";

export default {
  mounted() {
    let dropdown = this.$refs.filters;
    let options = {
      coverTrigger: false,
      hover: true,
    };
    M.Dropdown.init(dropdown, options);
  },
  methods: {
    ...mapActions("profiles", ["setProfiles"]),
  },
};
</script>

<style>
.brand-logo {
  margin-left: 1vw;
}
</style>
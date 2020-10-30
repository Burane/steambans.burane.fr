<template>
  <div class="card" v-bind:class="{'banned': profile.bans.banned_date }">
    <div class="card-image waves-effect waves-block waves-light">
      <div class="custom-container">
        <a :href="profile.url" target="_blank">
          <img class="activator responsive-img" :src="profile.avatar.large" />
          <svg v-if="profile.bans.banned_date" class="banned-svg" viewBox="0 0 56 18">
            <text class="banned-text" x="5" y="15">Banned</text>
          </svg>
        </a>
        <div class="close-icon">
          <a
            class="btn-floating btn-large waves-effect waves-light red btn modal-trigger"
            :data-target="profile.id_64"
          >
            <i class="material-icons">close</i>
          </a>
        </div>
      </div>
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">{{ profile.current_username }}</span>
      <p>Ajouté {{profile.date_start_monitoring | formatDateSince }}</p>
      <p v-if="profile.bans.banned_date">Banni {{profile.bans.banned_date | formatDateSince }}</p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">
        {{ profile.current_username }}
        <i class="material-icons right">close</i>
      </span>
      <p>Ajouté le {{profile.date_start_monitoring | formatDate }}</p>
      <p v-if="profile.bans.banned_date">Banni le {{profile.bans.banned_date | formatDate }}</p>
    </div>

    <!-- suppession confirmation  -->
    <div :id="profile.id_64" class="modal modal-fixed-footer">
      <div class="modal-content custom-container">
        <i class="material-icons right modal-close close-icon">close</i>
        <h2>Confirmer la supression de {{profile.current_username}}</h2>
        <div class="valigncenter">
          <div class="col s12 m6 offset-m3">
            <div class="card">
              <div class="card-image">
                <img :src="profile.avatar.large" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a v-on:click="__deleteProfile(profile.id_64)" class="waves-effect waves-light btn">
          <i class="material-icons right">done</i>Valider
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import moment from "moment";
import { mapActions } from "vuex";


export default {
  props: {
    profile: Object,
  },
  mounted() {
    let elems = document.querySelectorAll(".modal");
    let options = [{}];
    M.Modal.init(elems, options);
  },
  methods: {
      ...mapActions("profiles", ["deleteProfile","setProfiles"]),
      __deleteProfile(id_64) {
        let elem =  document.querySelector(`#${CSS.escape(id_64)}`);
        M.Modal.getInstance(elem).close();
        this.deleteProfile(id_64);
      }
  },
  filters: {
    formatDate: (value) => {
      if(value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm");
      }
    },
    formatDateSince: (value) => {
      if(value) {
        moment.locale('fr') 
        return moment(String(value)).fromNow()
      }
    }
  },
};
</script>

<style>
.card {
  height: 500px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}

.valigncenter {
  margin-top: 3vh;
}

.custom-container {
  position: relative;
  text-align: center;
  color: black;
}

.banned-svg {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate(-45deg);
  border: solid 5px red;
  border-radius: 5px;
}

.banned-text {
  font-family: Impact;
  fill: red;
}
</style>
import axios from "axios";

axios.defaults.baseURL = window.location.origin + "/api";

const state = () => ({
    profiles: [],
    parameter: 'all'
})


const getters = {
    getProfiles: state => state.profiles
}

const actions = {
    setParameter({
        commit
    }, parameter) {
        commit('SET_PARAMETER', {
            parameter: parameter
        })
    },
    async setProfiles({
        commit,
        state
    }) {
        let data = await axios.get(`/steamAccount/${state.parameter}`)
        commit('SET_PROFILES', {
            profiles: data.data
        })
    },
    async createProfile({
        commit,
        dispatch
    }, data) {
        await axios.post(`/steamAccount/add`, data)
        await dispatch("setProfiles", commit)
    },
    async deleteProfile({
        commit,
        dispatch
    }, id_64) {
        await axios.delete(`$/steamAccount/delete?steamAccountID=${id_64}`)
        await dispatch("setProfiles", commit)
    },
}

const mutations = {
    SET_PROFILES(state, {
        profiles
    }) {
        state.profiles = profiles
    },
    SET_PARAMETER(state, {
        parameter
    }) {
        state.parameter = parameter
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
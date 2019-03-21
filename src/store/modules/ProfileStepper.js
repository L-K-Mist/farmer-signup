// import {
//     UPDATE_USER
// } from '@/gql/mutations.js'

const state = {
    personalDetails: null,
    address: null,
    farmingActivities: null,
    element: 1,
    draftDone: false,
    profileIsOnline: false,
}

const getters = {
    element: state => state.element,
    stepperData: state => state.stepperData,
    personalDetails: state => state.personalDetails,
    address: state => state.address,
    farmingActivities: state => state.farmingActivities,
    draftDone: state => state.draftDone,
}

const mutations = {
    personalDetails(state, payload) {
        state.personalDetails = payload
    },
    address(state, payload) {
        state.address = payload
    },
    farmingActivities(state, payload) {
        state.farmingActivities = payload
    },
    draftDone(state, payload) {
        state.draftDone = payload
    },
}

const actions = {
    async sendProfile({
        state
    }) {

        // TODO Here send to Hasura.  
        // TODO make stepper editable
    },



    changeElement({
        state
    }, payload) {
        state.element = payload
    },

    personalDetails({
        state
    }, payload) {

    },

    address({
        state
    }, payload) {
        var docName = "address"
        upsertToPouch(docName, payload)
    },

    async farmingActivities({
        state
    }, payload) {},

    async fetchMe({
        state
    }) {

    },

}

export default {
    state,
    getters,
    mutations,
    actions
}
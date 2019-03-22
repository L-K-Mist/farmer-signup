import apollo from '@/apollo'

import {
    UPDATE_USER
} from '@/gql/mutations.js'

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
        state,
        rootState
    }) {
        console.log(rootState.Authentication.authUser)
        try {
            const response = await apollo.mutate({
                mutation: UPDATE_USER,
                variables: {
                    address: [{
                        area: state.address.area,
                        line_1: state.address.line1,
                        line_2: state.address.line2,
                        line_3: state.address.line3,
                        postal_code: state.address.postalCode,
                        province: state.address.province,
                        id: "google-oauth2|108754556378795682719"
                    }],
                    user_deets: [{
                        first_name: state.personalDetails.firstName,
                        last_name: state.personalDetails.firstName,
                        cell: state.personalDetails.firstName,
                        landline: state.personalDetails.firstName,
                        email: state.personalDetails.firstName,
                        sa_identity: state.personalDetails.firstName,
                        picture: state.personalDetails.picture,
                        auth0_id: "google-oauth2|108754556378795682719"
                    }],
                    activities: [{
                        scale: state.farmingActivities.category,
                        cultivation_approach: state.farmingActivities.cultivationApproach,
                        selling_what: state.farmingActivities.selling,
                        details: state.farmingActivities.shortDescription,
                        id: "google-oauth2|108754556378795682719"
                    }]
                }
            })
            console.log("TCL: response", response)

        } catch (error) {

        }
        // TODO Here send to Hasura.  
        // TODO make stepper editable
    },



    changeElement({
        state
    }, payload) {
        state.element = payload
    },




}

export default {
    state,
    getters,
    mutations,
    actions
}
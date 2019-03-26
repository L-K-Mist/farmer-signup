import {
    locationWardData,
    locationProvince
} from "@/api/zaMapAxios";
import apollo from '@/apollo'

import {
    UPDATE_FARM
} from '@/gql/mutations.js'


const state = {
    farmProfile: {
        name: null,
        totalLand: "",
        cultivatedLand: "",
        gpsPoints: {
            lat: null,
            lng: null
        },
        farmersAssociations: "",
        shareLocation: true
    },
    farmLocation: null,
    showFarmMap: false,
    municipalData: {
        ward: null,
        province: null
    },

}

const getters = {
    farmLocation: state => state.farmLocation,
    showFarmMap: state => state.showFarmMap,
    municipalData: state => state.municipalData,
    farmProfile: state => state.farmProfile,
}

const mutations = {
    farmProfile(state, payload) {
        state.farmProfile = payload
    }
}

const actions = {
    // farmProfile({
    //     state
    // }, payload) {
    //     state.farmProfile = payload
    //     console.log('TCL: state.farmProfile', state.farmProfile);
    // },
    setFarmLocation({
        state
    }, payload) {
        state.farmLocation = payload
    },
    showFarmMap({
        state,
        rootState
    }, payload) {
        state.showFarmMap = payload
    },
    async getMunicipalData({
        state
    }, payload) {
        state.municipalData.ward = await locationWardData(payload)
        state.municipalData.province = await locationProvince(payload)
        console.log('TCL: ---------------------------------------------');
        console.log('TCL: state.municipalData', state.municipalData);
        console.log('TCL: ---------------------------------------------');
    },
    async updateFarm({
        state,
        rootState
    }, payload) {
        console.log("TCL: payload", payload)

        try {
            const response = await apollo.mutate({
                mutation: UPDATE_FARM,
                variables: {
                    farm: [{
                        name: payload.name,
                        arable_land: payload.totalLand,
                        cultivated_land: payload.cultivatedLand,
                        location: payload.gpsPoints,
                        share_location: payload.shareLocation,
                        id: rootState.Authentication.userId,
                        farmers_associations: payload.farmersAssociations
                    }]
                }
            })
            console.log("TCL: response", response)

        } catch (error) {
            console.log("TCL: error", error)

        }


    },
    async fetchMyFarm({
        state
    }) {

    }

}

export default {
    state,
    getters,
    mutations,
    actions
}
import {
    locationWardData,
    locationProvince
} from "@/api/zaMapAxios";


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
    async saveFarmProfile({
        state,
        rootState
    }, payload) {

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
import {
    locationWardData,
    locationProvince
} from "@/api/zaMapAxios";


const state = {
    farmLocation: null,
    showFarmMap: false,
    municipalData: {
        ward: null,
        province: null
    },
    farmProfile: null
}

const getters = {
    farmLocation(state) {
        return state.farmLocation
    },
    showFarmMap(state) {
        return state.showFarmMap
    },
    municipalData(state) {
        return state.municipalData
    },
    farmProfile(state) {
        return state.farmProfile
    },
}

const actions = {
    farmProfile({
        state
    }, payload) {
        state.farmProfile = payload
        console.log('TCL: state.farmProfile', state.farmProfile);
    },
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
    actions
}
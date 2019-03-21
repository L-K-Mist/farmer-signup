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

const actions = {

    async sendProfile({
        state
    }) {},

    draftDone({
        state
    }, bool) {
        state.draftDone = bool
        console.log('TCL: ---------------------------------------');
        console.log('TCL: state.draftDone', state.draftDone);
        console.log('TCL: ---------------------------------------');
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
    actions
}
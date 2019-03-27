import apollo from '@/apollo'
import gql from 'graphql-tag'
import {
    CREATE_CROP
} from '@/gql/mutations.js'

const state = {
    vegOptions: null,
    crops: [],
    crop: {
        category: null,
        name: null,
        description: null,
        startDate: null,
        endDate: null
    },
}

const getters = {
    vegOptions: state => state.vegOptions,
    crops: state => state.crops,
    crop: state => state.crop,
}

const mutations = {
    crop(state, payload) {
        console.log(payload)
        state.crop = payload
    },
    vegOptions(state, payload) {
        console.log(payload)
        state.vegOptions = payload
        console.log('TCL: state.vegOptions', state.vegOptions);
    },
}

const actions = {
    async getCropNames({
        state,
        commit
    }) {
        const response = await apollo.query({
            query: gql `
                query produceList {
                    _Produce {
                        name
                        type
                        plants_per_meter
                        spacing
                    }
                }
            `
        })
        commit('vegOptions', response.data._Produce)
        return

    },
    async saveCrop({
        rootState,
        commit
    }, payload) {
        console.log("TCL: payload", payload)

        commit('crop', payload)
        try {
            const response = await apollo.mutate({
                mutation: CREATE_CROP,
                variables: {
                    crops: [{
                        category: payload.category,
                        description: payload.description,
                        start_date: payload.startDate,
                        end_date: payload.endDate,
                        name: payload.name,
                        user_id: rootState.Authentication.userId
                    }]
                }
            })
            console.log("TCL: response", response)

        } catch (error) {
            console.log("TCL: error", error)

        }
    },

    async fetchCrops({
        rootState,
        state
    }) {
        // TODO populate crops when we've got a few examples in db

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
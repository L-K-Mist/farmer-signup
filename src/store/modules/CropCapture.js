import apollo from '@/apollo'
import gql from 'graphql-tag'
import upsertToPouch from '@/helpers/upsertToPouch'
import db from '@/api/pouchDB'
import moment from 'moment'

const state = {
    vegOptions: null,
    crops: []
}

const getters = {
    vegOptions(state) {
        return state.vegOptions
    },
    crops(state) {
        return state.crops
    },
}

const actions = {
    async getCropNames({
        state
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
        state.vegOptions = response.data._Produce
        console.log('TCL: state.vegOptions', state.vegOptions);
    },
    async saveCrop({
        state,
        rootState,
        dispatch
    }, payload) {
        console.log('TCL: payload', payload);
        var farmState = rootState.AppState.docs.farm
        console.log('TCL: farmState', {
            ...farmState
        });

        const response = await apollo.mutate({
            mutation: gql `
                mutation createCrop(
                    $farmId: ID!
                    $category: CropCategory!
                    $name: String!
                    $description: String!
                    $startDate: DateTime!
                    $endDate: DateTime!
                ) {
                    createCrop(
                        category: $category name: $name description: $description startDate: $startDate endDate: $endDate farmId: $farmId
                    ) {
                        id
                        category
                        description
                        harvestWindow {
                            from
                            to
                        }
                        name
                        farm {
                            id
                            name
                        }
                    }
                }
            `,
            variables: {
                farmId: farmState.id,
                ...payload,

            }
        })

        console.log('TCL: response', response.data.createCrop);
        const docName = "crop/" + response.data.createCrop.id
        delete response.data.createCrop.__typename
        upsertToPouch(docName, response.data.createCrop)
        dispatch('fetchCrops')
    },

    async fetchCrops({
        rootState,
        state
    }) {
        var response = await apollo.query({
            query: gql `
            query currentCrops($farmId: ID!, $today: DateTime!) {
                currentCrops(
                    farmId: $farmId today: $today
                ) {
                    id
                    category
                    name
                    description
                    harvestWindow {
                        from
                        to
                    }
                    farm {
                        id
                        name
                    }
                }
            }
            `,
            variables: {
                farmId: rootState.AppState.docs.farm.id,
                today: moment()
            }
        })
        var crops = response.data.currentCrops
        console.log('TCL: crops', crops);

        state.crops = crops

    }
}

export default {
    state,
    getters,
    actions
}
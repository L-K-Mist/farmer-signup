import apollo from "@/apollo.js";
import gql from "graphql-tag";


const state = {
    newRoute: null,
    activeUser: null,
    error: null,
}

const getters = {
    activeUser(state) {
        return state.activeUser
    },
    error(state) {
        return state.error
    },
    newRoute(state) {
        return state.newRoute
    },
}

const mutations = {
    newRoute(state, payload) {
        state.newRoute = payload
        console.log("​newRoute -> payload", payload)

    },

}
const actions = {

    activeUser({
        state
    }, payload) {
        state.activeUser = {
            ...payload.user,
            token: payload.token

        }
        console.log("​state.activeUser", state.activeUser)

        console.log("​----------------------------------")

        console.log("​----------------------------------")

    },
    // async fetchMyStall({
    //     state,
    //     commit
    // }) {
    //     state.error = null
    //     try {
    //         const response = await apollo.query({
    //             query: gql `
    //             query myStall {
    //               myStall {
    //                 id
    //                 name
    //                 description
    //                 image
    //                 w3w
    //                 lat
    //                 lng
    //                 markets {
    //                     name
    //                 }
    //               }
    //             }
    //           `
    //         });
    //         console.log("​------------------")
    //         console.log("​response", response.data.myStall)
    //         console.log("​------------------")
    //         commit('stall', response.data.myStall)

    //         return

    //     } catch (err) {
    //         state.error = err
    //         console.log("​}catch -> state.error", state.error)

    //         // alert(err)
    //     }

    // },
    async fetchMe({
        state,
        commit
    }) {
        state.error = null
        try {
            const response = await apollo.query({
                query: gql `
                {
                    me {
                        id
                        name
                        cell
                        role
                        image
                        publicEmail
                        publicName
                        bio
                        stall{
                            id
                            image
                            w3w
                            lng
                            lat
                            name
                            description

                            markets {
                                name
                                province {
                                    name
                                }
                                id
                            }
                        }
                    }
                }
              `
            });
            console.log("​------------------")
            console.log("​response stallholder", response.data.me)
            console.log("​------------------")
            commit('stallHolder', response.data.me)

            return response.data.me

        } catch (err) {
            state.error = err
            console.log("​}catch -> state.error", state.error)

            // alert(err)
        }

    },
    error({
        state
    }, payload) {
        state.error = payload
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
import apollo from '@/apollo'
import gql from 'graphql-tag'
import {
    CREATE_PRODUCT
} from '@/gql/mutations.js'


const state = {
    product: {
        name: "Whatchoo-macallit",
        description: "Widget and Jam",
        unit: "dozen",
        stockLevel: 34,
        price: 67.78,
        imageSrc: ""
    },
    products: null
}


const getters = {
    product(state) {
        return state.product
    },
    products(state) {
        return state.products
    }
}

const mutations = {
    product(state, payload) {
        state.product = payload
    }
}

const actions = {
    async saveProduct({
        rootState,
        commit,
        state
    }, payload) {
        console.log("TCL: payload", payload)
        commit('product', payload)
        const response = await apollo.mutate({
            mutation: CREATE_PRODUCT,
            variables: {
                "products": [{
                    "description": payload.description,
                    "image_src": payload.imageSrc,
                    "name": payload.name,
                    "price": payload.price,
                    "stock_level": payload.stockLevel,
                    "unit": payload.unit,
                    "user_id": rootState.Authentication.userId

                }]
            }
        })
        console.log("TCL: response", response)

    },
    async fetchProducts({
        rootState,
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
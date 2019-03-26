import apollo from '@/apollo'
import gql from 'graphql-tag'

const state = {
    product: null,
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

const actions = {
    async saveProduct({
        rootState,
        state
    }, payload) {
        console.log('TCL: payload', JSON.stringify(payload));
        var farmState = rootState.AppState.docs.farm
        const response = await apollo.mutate({
            mutation: gql `
                mutation createProduct(
                    $farmId: ID!
                    $name: String!
                    $description: String
                    $unit: String
                    $stockLevel: Float
                    $price: Float
                    $imageSrc: String
                    $imageName: String
                ) {
                    createProduct(
                        farmId: $farmId 
                        name: $name 
                        description: $description 
                        unit: $unit 
                        stockLevel: $stockLevel 
                        price: $price
                        imageSrc: $imageSrc
                        imageName: $imageName
        
                    ) {
                        id
                        name
                        description
                        unit
                        stockLevel
                        price
                        imageSrc
                        imageName
                        farm {
                            id
                        }
                    }
                }
            `,
            variables: {
                farmId: farmState.id,
                ...payload,

            }
        })
        console.log('TCL: response', response);
    },
    async fetchProducts({
        rootState,
        state
    }) {
        var response = await apollo.query({
            query: gql `
                query currentProducts($farmId: ID!) {
                    currentProducts(
                        farmId: $farmId
                    ) {
                        id
                        name
                        description
                        unit
                        stockLevel
                        price
                        imageSrc
                        imageName
                    }
                }
            `,
            variables: {
                farmId: rootState.AppState.docs.farm.id,
            }
        })
        var products = response.data.currentProducts
        console.log('TCL: crops', products);

        state.products = products
        return products

    }
}

export default {
    state,
    getters,
    actions
}
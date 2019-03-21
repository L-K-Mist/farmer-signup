import gql from 'graphql-tag'

export const ME_QUERY = gql `
    query MeQuery {
        me {
            id
            name
            email
        }
    }
`

export const MY_FARM = gql `
    query myFarm {
        myFarm {
            farm {
                farmersAssociations
                id
                name
                totalLand
                cultivatedLand
                shareLocation
                gpsPoints {
                    lat
                    lng
                }
            }
        }
    }
`
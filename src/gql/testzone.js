import gql from 'graphql-tag'

const TEST = gql `
    mutation upsert_user_details($objects: [Users_insert_input!] !) {
        insert_Users(
            objects: $objects,
            on_conflict: {
                constraint: Users_pkey,
                update_columns: [first_name, email, cell]
            }
        ) {
            returning {
                first_name
                auth0_id
            }
        }
    }

    {
        "objects": [{
            "first_name": "Dilly Dee",
            "last_name": "van den Bosch",
            "cell": "123456",
            "landline": "321654",
            "auth0_id": "google-oauth2|108754556378795682719",
            "email": "dylan@vandenbosch.co.za",
            "sa_identity": "7701025046083"
        }]
    }
`

const TESTSOMEMORE = gql `
    mutation upsert_address($objects: [Addresses_insert_input!] !) {
        insert_Addresses(
            objects: $objects,
            on_conflict: {
                constraint: Addresses_pkey,
                update_columns: [area, line_1, line_2, line_3, postal_code, province, user_id]
            }
        ) {
            returning {
                user {
                    first_name
                }
            }
        }
    }


    {
        "objects": [{
            "area": "there",
            "line_1": "Near ja",
            "postal_code": "5555",
            "province": "KZN",
            "user_id": "google-oauth2|108754556378795682719"
        }]

    }
`
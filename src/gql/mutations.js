import gql from 'graphql-tag'

export const AUTHORIZE = gql `
    mutation upsert_user(
        $first_name: String,
        $auth0_id: String,
        $email: String
    ) {
        insert_Users(objects: [{
            first_name: $first_name,
            auth0_id: $auth0_id,
            email: $email
        }], on_conflict: {
            constraint: Users_pkey,
            update_columns: [first_name, email]
        }) {
            affected_rows
            returning {
                first_name
                email
            }
        }
    }

`
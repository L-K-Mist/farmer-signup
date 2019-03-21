import gql from 'graphql-tag'

export const AUTHORIZE = gql `
mutation upsert_user($objects: [Users_insert_input!]) {
    insert_Users(objects: $objects, on_conflict: {
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
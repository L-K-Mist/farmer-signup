import gql from "graphql-tag";

export const AUTHORIZE = gql`
  mutation upsert_user(
    $objects: [Users_insert_input!]
    $now: String
    $user: String
  ) {
    insert_Users(
      objects: $objects
      on_conflict: {
        constraint: Users_pkey
        update_columns: [first_name, email]
      }
    ) {
      affected_rows
      returning {
        first_name
        email
      }
    }
    insert_Session(objects: [{ start: $now, user_id: $user }]) {
      affected_rows
      returning {
        id
        user_id
        start
      }
    }
  }
`;

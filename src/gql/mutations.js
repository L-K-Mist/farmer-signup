import gql from "graphql-tag";

export const AUTHORIZE = gql `
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

export const UPDATE_USER = gql `
mutation upsert_user_combo(
  $address: [Addresses_insert_input!] !
  $user_deets: [Users_insert_input!] !
  $activities: [FarmerActivities_insert_input!] !
) {
  insert_Users(
    objects: $user_deets,
    on_conflict: {
      constraint: Users_pkey,
      update_columns: [first_name, email, picture_src , cell, landline, address_id, activities_id]
    }
  ) {
    returning {
      first_name
      auth0_id
    }
  }
  insert_Addresses(
    objects: $address,
    on_conflict: {
      constraint: Addresses_pkey,
      update_columns: [area, line_1, line_2, line_3, postal_code, province]
    }
  ) {
    returning {
      user {
        first_name
        auth0_id
        picture_src
      }
    }
  }
  insert_FarmerActivities(
    objects: $activities,
    on_conflict: {
      constraint: Farmer_Activities_pkey,
      update_columns: [
        cultivation_approach,
        details,
        scale,
        selling_what
      ]
    }
  ) {
    returning {
      selling_what
      user {
        first_name
        auth0_id

      }
    }
  }
}
`

export const UPDATE_FARM = gql `
mutation upsert_farm($farm: [Farms_insert_input!] !) {
  insert_Farms(
    objects: $farm,
    on_conflict: {
      constraint: Farms_pkey,
      update_columns: [arable_land, cultivated_land, farmers_associations, location, share_location, name]
    }
  ) {
    affected_rows
    returning {
      user {
        auth0_id
        first_name
        address {
          line_1
          province
        }
      }
    }
  }
}
`

export const CREATE_CROP = gql `
mutation create_Crop($crops: [Crops_insert_input!] !) {
  insert_Crops(objects: $crops) {
    affected_rows
  }
}
`

// example vars for CREATE_CROP
/**
{
  "crops": [{
    "category": "testCat",
    "description": "this cat",
    "start_date": "Text",
    "end_date": "Text",
    "name": "my crop",
    "user_id": "google-oauth2|108754556378795682719"
  }]
}
 */

export const CREATE_PRODUCT = gql `
mutation add_product($products: [Products_insert_input!] !) {
  insert_Products(objects: $products) {
    affected_rows
    returning {
      id
    }
  }
}
`

// example vars for CREATE_PRODUCT
/**
{
  "products": [{
    "description": "Widget and Jam",
    "image_src": "https://res.cloudinary.com/dylan-van-den-bosch/image/upload/w_auto,h_240,c_fill,g_auto,q_auto,f_auto/wzkcenxzx40b3btmxqkm",
    "name": "Whatchoo-macallit",
    "price": 67.78,
    "stock_level": 34,
    "unit": "dozen",
    "user_id": "google-oauth2|108754556378795682719"
  }]
}
 */
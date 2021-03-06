import addSeconds from "date-fns/add_seconds";
import { auth0 } from "@/session.js";

import apollo from "@/apollo";
import { AUTHORIZE } from "@/gql/mutations.js";

// Based on: https://itnext.io/managing-and-refreshing-auth0-tokens-in-a-vuejs-application-65eb29c309bc

const state = {
  userId: null,
  idToken: null,
  accessToken: null,
  tokensExpiry: null,
  isHasuraAuth: false,
  isLoggedIn: false,
  authUser: null,
  newRoute: null,
  person: {}
};

const getters = {
  tokensExpiry: state => state.tokensExpiry,
  accessToken: state => state.accessToken,
  idToken: state => state.idToken,
  isLoggedIn: state => state.isLoggedIn,
  isHasuraAuth: state => state.isHasuraAuth,
  prismaToken: state => state.prismaToken,
  authUser: state => state.authUser,
  person: state => state.person,
  newRoute: state => state.newRoute
};

const mutations = {
  update_auth_tokens(state, tokenData) {
    console.log("​update_auth_tokens -> tokenData", tokenData);
    state.accessToken = tokenData.accessToken || tokenData.access_token;
    state.idToken = tokenData.idToken || tokenData.id_token;
    const tokensExpiry = addSeconds(
      new Date(),
      tokenData.expiresIn || tokenData.expires_in
    );
    state.tokensExpiry = tokensExpiry;
    if (tokenData.accessToken || tokenData.access_token) {
      // Inside an if to avoid errors when we're clearing the tokenData object on logout in session.js
      state.authUser = tokenData.idTokenPayload;
      console.log("​update_auth_tokens -> state.authUser", state.authUser);
      state.userId = state.authUser.sub || "";
      console.log("TCL: update_auth_tokens -> state.userId", state.userId);
    }

    if (state.accessToken) {
      state.isLoggedIn = true;
    } else {
      state.isLoggedIn = false;
      state.isHasuraAuth = false;
    }
  },

  isHasuraAuth(state, bool) {
    state.isHasuraAuth = bool;
  },

  isLoggedIn(state, bool) {
    state.isLoggedIn = bool;
    console.log("​isLoggedIn -> state.isLoggedIn", state.isLoggedIn);
  },
  person(state, payload) {
    state.person = Object.assign(state.person, payload);
    console.log("TCL: person -> state.person", state.person);
  },
  newRoute(state, payload) {
    state.newRoute = payload;
  }
};

const actions = {
  isLoggedIn({ commit }, payload) {
    commit("isLoggedIn", payload);
  },

  update_auth_tokens({ commit }, payload) {
    commit("update_auth_tokens", payload);
  },

  async hasuraAuth({ state, commit }) {
    if (!state.isLoggedIn) {
      console.log("You can't authorise hasura if user is not logged in");
      return;
    }
    if (state.authUser) {
      try {
        const response = await apollo.mutate({
          mutation: AUTHORIZE,
          variables: {
            objects: [
              {
                first_name: state.authUser.given_name,
                auth0_id:
                  state.authUser["https://hasura.io/jwt/claims"][
                    "x-hasura-user-id"
                  ],
                email: state.authUser.email
              }
            ],
            now: new Date(),
            user:
              state.authUser["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
          }
        });
        console.log("TCL: HasuraauthorizeUser -> response user", response.data);
        state.isHasuraAuth = true;
        return response;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async parseTokens({ dispatch, commit, hashValue }) {
    console.log("​update_auth_user -> hashValue", hashValue);
    await auth0.parseHash((err, authResult) => {
      console.log("​update_auth_user -> authResult", authResult);
      if (authResult.accessToken && authResult.idToken) {
        commit("update_auth_tokens", authResult);
        // commit('person', authResult.idTokenPayload)
        dispatch("hasuraAuth");
        return authResult;
      } else if (err) {
        // this.logout()
        reject(err);
      }
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

import store from '@/store/store.js'
// import router from './router'
import isAfter from "date-fns/is_after";
import subtractMinutes from "date-fns/sub_minutes";
import addSeconds from "date-fns/add_seconds";
// import differenceInMinutes from "date-fns/difference_in_minutes";
import differenceInMilliSeconds from "date-fns/difference_in_milliseconds";
import {
    WebAuth
} from "auth0-js";
import apollo from '@/apollo'

// Get the route that user was on when login kicked in and save that to this state
// Then when the login is done have Callback.vue push to where the user was headed.

let refreshTimeout = null;
const auth0 = new WebAuth({
    domain: "welink.au.auth0.com",
    clientID: "XZVPNELwKrxDAcH6DYf4QxQEUCjWhXgh",
    // make sure this line contains the port: 8080
    redirectUri: process.env.VUE_APP_ENV_CALLBACK,
    // we will use the api/v2/ to access the user information as payload
    audience: "https://" + "welink.au.auth0.com" + "/api/v2/",
    responseType: "token id_token",
    scope: "openid email profile" // define the scopes you want to use
});

export {
    auth0
};
export {
    initSession
};
export {
    refreshTokens
};
export {
    logout
};
export default {
    initSession,
    refreshTokens,
    auth0,
};

function logout() {
    console.log("​logout inside session triggered -> logout")
    store.dispatch("update_auth_tokens", {}); //clear our tokens
    store.dispatch("isLoggedIn", false)
    apollo.resetStore() // empty the apollo cache to eliminate conflicts
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
    auth0.logout({
        returnTo: process.env.VUE_APP_HOMELINK
    });
}


function initSession() {
    return new Promise((resolve) => {
        let tokenExpiryDate = store.getters["tokensExpiry"];
        if (!tokenExpiryDate) {
            console.log("No token expiry date. user probably never logged in");
            return store.commit("isLoggedIn", false) // review
        }

        let tenMinutesBeforeExpiry = subtractMinutes(tokenExpiryDate, 10); //If the token has expired or will expire in the next 30 minutes
        const now = new Date();

        if (isAfter(now, tenMinutesBeforeExpiry)) { //If the token has expired or will expire in the next 10 minutes
            console.log("Token expired/will expire in the next 1 minutes");
            store.dispatch("isLoggedIn", false)
            return false
        }

        console.log("Token Ok. Expiring at " + tokenExpiryDate);
        refreshTimeout = setTimeout(refreshTokens, differenceInMilliSeconds(tenMinutesBeforeExpiry, now));

        store.dispatch("isLoggedIn", true) // direct commit here was causing circular reference errors
        return true
    });
}

function refreshTokens() {
    return new Promise((resolve) => {
        console.log('Session is refreshing tokens')
        auth0.checkSession({
            responseType: "token id_token"
        }, function (err, authResult) {
            console.log("​checkSession's authResult", authResult)

            if (err) {
                store.dispatch("isLoggedIn", false)
                // router.push("/login");
            }
            store.commit("update_auth_tokens", authResult);
            const tokenExpiryDate = addSeconds(new Date(), authResult.expiresIn);
            const tenMinutesBeforeExpiry = subtractMinutes(tokenExpiryDate, 10);
            const now = new Date();
            refreshTimeout = setTimeout(refreshTokens, differenceInMilliSeconds(tenMinutesBeforeExpiry, now));
            resolve();
        });
    });
}
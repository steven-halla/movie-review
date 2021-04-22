export const authHeader = () => {
    // lets read the "userAuth" object from local storage.
    // it contains basic information about the user, such as id, displayName, and accessToken
    const userAuth = JSON.parse(<string>localStorage.getItem("userAuth"));

    if (userAuth && userAuth.accessToken) {
        return {'authorization': userAuth.accessToken};
    } else {
        return {}
    }
}

//local storage is so that data is still there when the page closes down
//otherwise , if we did session storage the session would be lost upon a page closing down.

// this helper function checks local storage for user item.

// if a logged in user has an JWT, return HTTP authorization header.

// otherwise return an empty object



//*****************
// why do we need line 6, where we have userAuth twice?
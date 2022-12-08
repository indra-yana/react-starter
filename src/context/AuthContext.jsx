import React from "react";

const auth = {
    authenticated: false,
    setAuthenticated: (auth) => { },
}

const AuthContext = React.createContext(auth);

export {
    auth,
    AuthContext
};
import React from "react";

const auth = {
    authenticated: true,
    setAuthenticated: (auth) => {},
}
 
const AuthContext = React.createContext(auth);

export {
    auth,
    AuthContext
};
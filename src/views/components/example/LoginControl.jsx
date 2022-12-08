import React from "react";
import { AuthContext } from "../../../context/AuthContext";
import { LoginButton, LogoutButton } from "./Button";
import Greeting from "./Greeting";

class LoginControl extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.props.onAuthChanged(true);
    }
    
    handleLogoutClick() {
        this.props.onAuthChanged(false);
    }

    render() {
        const isLoggedIn = this.context.authenticated;

        return (
            <AuthContext.Consumer>
                {value => (
                    <>
                        {isLoggedIn ? <LogoutButton onClick={this.handleLogoutClick}/> : <LoginButton onClick={this.handleLoginClick}/>}
                        <Greeting isLoggedIn={value.authenticated}/>
                    </>
                )}
            </AuthContext.Consumer>
        )
    }
}

export default LoginControl;
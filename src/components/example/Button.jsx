function SubmitButton(props) {
    return (
        <button onClick={props.onClick}>Submit</button>
    );
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>Login</button>
    );
}
  
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>Logout</button>
    );
}

export {
    LoginButton,
    LogoutButton,
    SubmitButton,
}
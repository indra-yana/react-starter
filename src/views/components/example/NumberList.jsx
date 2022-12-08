import { AuthContext } from "../../../context/AuthContext";
import { SubmitButton } from "./Button";
import Greeting from "./Greeting";

function NumberList(props) {
    const { numbers = [] } = props;
    const listItems = numbers.map((number, index) => 
        <li key={index.toString()}>Numb: {number}</li>
    )

    return (
        <AuthContext.Consumer>
            { value => (
                <>
                    <ul>{listItems}</ul>
                    <Greeting isLoggedIn={value.authenticated}/>
                    <SubmitButton onClick={() => value.setAuthenticated(!value.authenticated)} />
                </>
            )}
        </AuthContext.Consumer>
    )
}

export default NumberList;
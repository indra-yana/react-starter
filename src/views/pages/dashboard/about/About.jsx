import { Link } from "react-router-dom";

export default function About(props) {
    return (
        <section className="d-grid gap-3">
            <div className="bg-light p-5 rounded-3 shadow-sm border">
                <div className="col-sm-8 mx-auto">
                    <h1>About</h1>
                    <p>This project is purposed for building your awesome app that needed a starting point with basic fitur that listed bellow:</p>
                    <ul>
                        <li>Basic Authentication
                            <ul>
                                <li>Login</li>
                                <li>Register</li>
                                <li>Forgot Password</li>
                                <li>Verify Account</li>
                                <li>Password Confirmation</li>
                            </ul>
                        </li>
                        <li>User Management</li>
                        <li>Role Management</li>
                    </ul>
                    <p>Core feature included in this project:</p>
                    <ul>
                        <li>React v18.2.0</li>
                        <li>React Router v6.5.0</li>
                        <li><a href="https://vitejs.dev/guide/" target="_blank">Vite</a></li>
                        <li>Multi Language Using <a href="https://www.i18next.com" target="_blank">i18next</a> and <a href="https://react.i18next.com">react i18next</a> </li>
                        <li>Secure Local Storage Using <a href="https://github.com/softvar/secure-ls" target="_blank">secure ls</a></li>
                    </ul>
                    <p>
                        You must provide your own API before using this project, or you can use my<a href="https://github.com/indra-yana/fastify-kit" target="__blank">Fasity-Kit</a> REST Porject and integrated with it.
                        The API Spec will described bellow:
                    </p>
                    <ul>
                        <li>TODO: See README.md on this repository.</li>
                    </ul>
                    <p className="mt-5">
                        <Link to={'/dashboard'}>
                            <button className="btn btn-outline-primary" role="button">Back to dashboard »</button>
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
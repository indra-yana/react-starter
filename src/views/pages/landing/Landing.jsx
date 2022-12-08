import React, { useState } from "react";
import { Link } from "react-router-dom";

function Landing(props) {
    const { isLogin, setIsLogin } = useState();

    return (
        <>
            <section className="d-grid gap-3">
                <div className="bg-light p-5 rounded ">
                    <div className="col-sm-8 mx-auto">
                        <h1>Welcome Back!</h1>
                        <p>This example is a quick exercise to illustrate how the navbar and its contents work. Some navbars extend the width of the viewport, others are confined within a <code>.container</code>. For positioning of navbars, checkout the <a href="/docs/5.0/examples/navbar-static/">top</a> and <a href="/docs/5.0/examples/navbar-fixed/">fixed top</a> examples.</p>
                        <p>At the smallest breakpoint, the collapse plugin is used to hide the links and show a menu button to toggle the collapsed content.</p>
                        <p>
                            <Link to={'/contacts'}>
                                <button className="btn btn-primary" role="button">Go to Dashboard »</button>
                            </Link>
                        </p>
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="container marketing">
                    <div className="row">
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                            <h2 className="fw-normal">Heading</h2>
                            <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
                            <p><a className="btn btn-secondary" href="#">View details »</a></p>
                        </div>
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                            <h2 className="fw-normal">Heading</h2>
                            <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
                            <p><a className="btn btn-secondary" href="#">View details »</a></p>
                        </div>
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                            <h2 className="fw-normal">Heading</h2>
                            <p>And lastly this, the third column of representative placeholder content.</p>
                            <p><a className="btn btn-secondary" href="#">View details »</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing;
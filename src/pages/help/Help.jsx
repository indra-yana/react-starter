import React, { useState } from "react";
import { Link } from "react-router-dom";

function Help(props) {
    return (
        <>
            <div>
                <div className="bg-light p-5 rounded">
                    <div className="col-sm-8 mx-auto">
                        <h1>Help (Need any help?)</h1>
                        <p>This example is a quick exercise to illustrate how the navbar and its contents work. Some navbars extend the width of the viewport, others are confined within a <code>.container</code>. For positioning of navbars, checkout the <a href="/docs/5.0/examples/navbar-static/">top</a> and <a href="/docs/5.0/examples/navbar-fixed/">fixed top</a> examples.</p>
                        <p>At the smallest breakpoint, the collapse plugin is used to hide the links and show a menu button to toggle the collapsed content.</p>
                        <p>
                            <Link to={'/'}>
                                <button className="btn btn-primary" role="button">Go to Home »</button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Help;
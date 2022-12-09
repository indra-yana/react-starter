import { useLocation } from "react-router-dom";
import { usePageTitle } from "../../../../hooks/usePageTitle"
import Breadcrumb from "../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../components/utility/BreadcrumbItem";

export default function Dashboard(props) {
    usePageTitle('Dashboard');

    return (
        <>
            <section className="px-3">
                <Breadcrumb>
                    <BreadcrumbItem title="Dashboard" link="/dashboard" />
                    <BreadcrumbItem title="Index" active />
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-12">
                        <div class="card">
                            <h5 class="card-header">Featured</h5>
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
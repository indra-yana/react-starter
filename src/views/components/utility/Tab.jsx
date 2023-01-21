import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Tab(props) {
    const { tabs = [], active = 0 } = props
    const [activeTab, setActiveTab] = useState(active);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const tabIndex = searchParams.get('tab');
        if (tabIndex !== undefined && tabIndex !== null) {
            setActiveTab(tabIndex);
        }
    }, []);

    useEffect(() => {
        setSearchParams({ tab: activeTab })
    }, [activeTab]);

    function tabKey(title) {
        return title.toLowerCase().replace(/\s+/g, '-');
    }

    return (
        <>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            type="button"
                            role="tab"
                            className={`nav-link ${activeTab == index ? 'active' : ''}`}
                            id={`nav-${tabKey(tab.title)}-tab`}
                            data-bs-toggle="tab"
                            data-bs-target={`#nav-${tabKey(tab.title)}`}
                            aria-controls={`nav-${tabKey(tab.title)}`}
                            aria-selected={activeTab == index ? true : false}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
            </nav>
            <div className="tab-content py-4" id="nav-tabContent">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab-pane fade ${activeTab == index ? 'show active' : ''}`}
                        id={`nav-${tabKey(tab.title)}`}
                        role="tabpanel"
                        aria-labelledby={`nav-${tabKey(tab.title)}-tab`}
                        tabIndex="0"
                    >
                        {tab.content || 'No Content'}
                    </div>
                ))}
            </div>
        </>
    )
}
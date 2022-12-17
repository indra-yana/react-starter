import { useEffect, useState } from "react";
import { useLocation, useMatches } from "react-router-dom";

export function useActiveMenu() {
    const [currentRouteName, setCurrentRouteName] = useState('index');
    const location = useLocation();
    const matches = useMatches();
    
    useEffect(() => {
        matches.forEach((item) => {
            if (item.handle) {
                const { routeName = '' } = item.handle;
                setCurrentRouteName(routeName);
            }
        })
    }, [location.pathname]);

    return [
        currentRouteName,
        setCurrentRouteName,
    ]
}
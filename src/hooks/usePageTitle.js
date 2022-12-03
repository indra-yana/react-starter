import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export function usePageTitle(title) {
    const defaultTitle = "React Starter";
    const { setNavTitle } = useOutletContext();

    useEffect(() => {
        document.title = title || defaultTitle;
        
        setNavTitle(title);
    }, [defaultTitle, title]);
};
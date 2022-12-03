import { useEffect } from "react";

export function usePageTitle(title) {
    const defaultTitle = "React Starter";

    useEffect(() => {
        document.title = title || defaultTitle;
    }, [defaultTitle, title]);
};
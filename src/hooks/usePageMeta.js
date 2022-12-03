import { useEffect } from "react";

export function usePageMeta(title, description) {
    const defaultTitle = "React Starter";
    const defaultDesc = "meta description";

    useEffect(() => {
        document.title = title || defaultTitle;
        document.querySelector("meta[name='description']").setAttribute("content", description || defaultDesc);
    }, [defaultTitle, title, defaultDesc, description]);
};
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

export function useLoadingState(loading = false, div = null) {
    const [isLoading, setIsloading] = useState(loading);
    const nav = useNavigation();

    useEffect(() => {
        if (nav.state === 'idle') {
            NProgress.done();
        }
    }, [nav.state]);

    useEffect(() => {
        const container = document.querySelector(div || '#main');

        if (isLoading) {
            NProgress.start();
            if (container) {
                container.classList.add('loading');
            }
        } else {
            NProgress.done();
            if (container) {
                container.classList.remove('loading');
            }
        }

    }, [isLoading]);

    return [isLoading, setIsloading];
}
import { useEffect } from "react";

export function useDisabledWhenLoading(isLoading) {
    useEffect(() => {
        var noInteracts = document.getElementsByClassName('loading');
        [].map.call(noInteracts, function (elem) {
            elem.addEventListener("keydown", function (e) {
                if (e.keyCode != 9) {
                    e.returnValue = false;
                    return false;
                }
            }, true);
        });
    }, [isLoading]);
}
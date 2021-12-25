import { useEffect, RefObject } from "react";

/**
 * Hook that runs callback if click happened outside of the passed ref
 */
function useDetectClickOutside(ref: RefObject<HTMLElement>, callback: Function) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
};

export default useDetectClickOutside;


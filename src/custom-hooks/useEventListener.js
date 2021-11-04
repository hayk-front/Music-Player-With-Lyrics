import { useRef, useEffect } from "react";

export const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler, savedHandler]);

  useEffect(() => {
    // checking if element supports addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // create event listener that calls handler f-n stored in ref
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, savedHandler]); // re-run if eventName or element changes
};

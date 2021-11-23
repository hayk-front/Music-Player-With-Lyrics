import { useState, useEffect, useRef } from "react";

export const useRefHook = (intialRef) => {
  const [ref, setRef] = useState(null);

  useEffect(() => {
    setRef(intialRef);
  }, [intialRef, setRef]);

  return ref;
};

export const usePlayPause = (audio) => {
  const [paused, setPaused] = useState(true);

  if (audio) {
    if (audio.paused) {
      audio.play();
      setPaused(false);
    } else {
      audio.pause();
      setPaused(true);
    }
  }

  return paused;
};

export const useOnOutsideClick = (elem, handler) => {
  const outsideClick = (e) => {
    if (elem && !elem.contains(e.target)) {
      handler();
    }
  };
  useEventListener("mousedown", (e) => outsideClick(e));
};

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

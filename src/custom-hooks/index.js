import { useState, useEffect } from "react";

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

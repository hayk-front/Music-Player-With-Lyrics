import React, { useState } from "react";
import { createContext } from "react";

export const AudioChunkContext = createContext(null);

export const AudioChunkProvider = (props) => {
  const [sizeInPercent, setPercentSize] = useState(0);
  const [isResizable, setIsResizable] = useState(false);
  const [activeEdge, setActiveEdge] = useState(null);
  const [sizeInPixels, setPixelSize] = useState(0);
  const [activeChunkRef, setActiveChunkRef] = useState(null);

  return (
    <AudioChunkContext.Provider
      value={{
        sizeInPercent,
        setPercentSize,
        isResizable,
        setIsResizable,
        activeEdge,
        setActiveEdge,
        sizeInPixels,
        setPixelSize,
        activeChunkRef,
        setActiveChunkRef
      }}
    >
      {props.children}
    </AudioChunkContext.Provider>
  );
};

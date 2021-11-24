import React, { useState } from "react";
import { createContext } from "react";

export const TimelineContext = createContext(null);

export const TimelineProvider = React.memo((props) => {
  const [zoom, setZoom] = useState(1);

  return (
    <TimelineContext.Provider
      value={{
        zoom,
        setZoom,
      }}
    >
      {props.children}
    </TimelineContext.Provider>
  );
});

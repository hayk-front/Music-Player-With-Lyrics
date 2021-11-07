import React from "react";
import { Body } from "./containers/Body";
import { Footer } from "./containers/Footer";
import Header from "./containers/Header/";
import { AudioChunkProvider } from "./context/AudioChunkContext";

export const App = React.memo(() => {
  return (
    <div className="App">
      <Header />
      <AudioChunkProvider>
        <Body />
        <Footer />
      </AudioChunkProvider>
    </div>
  );
});

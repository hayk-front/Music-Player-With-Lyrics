import React from "react";
import { Body } from "./containers/Body";
import { Footer } from "./containers/Footer";
import Header from "./containers/Header/";

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

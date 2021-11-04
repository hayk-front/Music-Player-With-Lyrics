import React from "react";
import Screen from "./Screen";
import Sidebar from "./Sidebar";
import * as Styled from "./styled";
import SubtitleListSidebar from "./SubtitleListSidebar";

export const Body = () => {
  return (
    <Styled.Body>
      <Sidebar />
      <Screen />
      <SubtitleListSidebar />
    </Styled.Body>
  );
};

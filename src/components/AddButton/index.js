import React from "react";
import { connect } from "react-redux";
import { addChunk } from "../../redux/actions/action";
import * as Styled from "./styled";

const Sidebar = React.memo((props) => {
  const { addChunk } = props;
  return (
    <Styled.Button onClick={addChunk}>
      <Styled.Icon src="./icons/add.svg" />
      Add Chunk
    </Styled.Button>
  );
});

export default connect(null, { addChunk })(Sidebar);

import React, { useState } from "react";
import { connect } from "react-redux";
import { editChunkText } from "../../../../../redux/actions/action";
import { getActiveChunkText } from "../../../../../redux/selectors";
import * as Styled from "./styled";

const TextInput = (props) => {
  const [inputValue, setValue] = useState(props.text);
  const [timer, setTimer] = useState(null);

  const updateText = (e) => {
    setValue(e.target.value)
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        editChunkText(e.target.value);
      }, 1500)
    );
  };

  return (
    <Styled.Label>
      <Styled.Input
        value={inputValue}
        onChange={updateText}
      ></Styled.Input>
    </Styled.Label>
  );
};

const mapStateToProps = (state) => ({
  text: getActiveChunkText(state)
})

export default connect(mapStateToProps, { editChunkText })(TextInput);

import React, { useEffect, useState } from "react";
import * as Styled from "./styled";

export const BigTick = React.memo((props) => {
  const { second } = props;
  const [time, setTime] = useState("");

  useEffect(() => {
    if (second >= 60) {
      const min = Math.floor((second % 3600) / 60);
      const sec = Math.floor(second % 60);
      setTime(`${min}m${sec}s`);
    } else {
      setTime(`${second}s`);
    }
  }, [second]);

  return (
    <Styled.BigTickWrapper>
      <Styled.Seconds>{time}</Styled.Seconds>
      <Styled.BigTick />
    </Styled.BigTickWrapper>
  );
});

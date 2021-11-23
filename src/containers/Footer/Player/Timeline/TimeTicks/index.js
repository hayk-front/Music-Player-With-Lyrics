import React, { Fragment, useEffect, useState } from "react";
import { SmallTick } from "./SmallTick";
import { BigTick } from "./BigTick";
import * as Styled from "./styled";
import { connect } from "react-redux";
import { getAudioDuration } from "../../../../../redux/selectors";

const TimeTicks = React.memo((props) => {
  const { duration, zoom } = props;
  const splitCount = 10 * zoom;
  const percent = duration > splitCount ? splitCount : duration;
  const [splitted, setSplitted] = useState(null);

  useEffect(() => {
    const splitArray = [];
    const step = Math.round(duration / percent);
    // need to be refactored !
    for (let i = 0; i < percent; i++) {
      splitArray.push(step * i);
    }
    return setSplitted(splitArray);
  }, [duration, zoom, percent]);

  return (
    <Styled.TimeTicks>
      {splitted &&
        splitted.map((sec, index) => {
          return (
            <Fragment key={index}>
              <BigTick second={sec} />
              <>
                <SmallTick />
                <SmallTick />
                <SmallTick />
              </>
            </Fragment>
          );
        })}
    </Styled.TimeTicks>
  );
});

const mapStateToProps = (state) => ({
  duration: getAudioDuration(state),
});

export default connect(mapStateToProps)(TimeTicks);

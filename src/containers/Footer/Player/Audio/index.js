import React, { useEffect, useRef } from "react";

export const Audio = (props) => {
  const { setAudio } = props;
  const audioPlayer = useRef(null);

  useEffect(() => {
    setAudio(audioPlayer.current);
  }, [audioPlayer, setAudio]);

  return (
    <audio ref={audioPlayer} src="./songs/song.mp3">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
};
import React from 'react';

const Timer = ({ min, sec, startTimer, stopTimer }) => {
  return (
    <span className="description">
      <button className="icon icon-play" onClick={startTimer}></button>
      <button className="icon icon-pause" onClick={stopTimer}></button>
      {min < 10 ? '0' : ''}
      {min}:{sec < 10 ? '0' : ''}
      {sec}
    </span>
  );
};

export default Timer;

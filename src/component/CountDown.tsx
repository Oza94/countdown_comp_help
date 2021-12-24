import React from "react";
import { useState, useEffect } from 'react';
import { Wrapper } from "./CountDown.styles";

const MAX_TIME = 30;

type Props = {
  nb: number;
  onDone: () => void;
}

export const CountDownComponent: React.FC<Props> = ({
  nb,
  onDone,
}) => {
  const [ time, setTime ] = useState(MAX_TIME);
  const reset = () => {
    setTime(MAX_TIME);
  };
  const countDown = () => {
    if (time === 0) {
      onDone();
      reset();
    } else {
      setTime(time - 1);
    }
  };
  // Update counter every second
  useEffect(() => {
    const timer = setInterval(countDown, 1000);
    return () => {
      clearInterval(timer)}
  });
  // Restart counter when 'nb' props change
  useEffect(() => {
    reset();
  }, [nb]);
  return (
    <Wrapper>
      <i className="fas fa-stopwatch fa-3x"></i>
      <p id='counter'>{time}s</p>
    </Wrapper>
  )
}
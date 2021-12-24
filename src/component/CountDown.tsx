import React from "react";
import { useState, useEffect } from "react";
import { Wrapper } from "./CountDown.styles";

const MAX_TIME = 30;

type Props = {
  nb: number;
  onDone: () => void;
};

// Il faut type les Props de cette manière, chez moi TS ne reconnait pas l'autre forme
// J'ai aussi retiré le suffixe "Component", pour moi c'est pas utile de tout suffixer "Component" dans un univers react
export const CountDown = ({ nb, onDone }: Props) => {
  const [time, setTime] = useState(MAX_TIME);
  const reset = () => {
    setTime(MAX_TIME);
  };

  // Update counter every second
  useEffect(() => {
    // J'ai déplacé countDown dans le useEffect pour éviter de l'avoir en dépendance du hook
    const countDown = () => {
      if (time === 0) {
        onDone();
        reset();
      } else {
        setTime(time - 1);
      }
    };

    // Ptite not sur setInterval / setTimeout. Ici ils attendront au minimum 1000ms mais c'est pas dit
    // que ça soit pile 1000ms. Si ton ordinateur est occupé ou que l'onglet est pas le 1er onlget, le
    // navigateur peut choisir de l'appeler bcp moins souvent. Pour un cas simple comme ici c'est satisfaisant
    // mais si t'as besoin d'une grande précision il faudra utiliser d'autres techniques comme mesurer précisément
    // le temps écoulé via un Date.now() à chaque appel de countDown.
    const timer = setInterval(countDown, 1000);
    return () => {
      clearInterval(timer);
    };
    // Ici tu dois mettre en dépendance du hook les valeurs utilisée, time et onDone
  }, [time, onDone]);

  // Restart counter when 'nb' props change
  useEffect(() => {
    reset();
  }, [nb]);

  return (
    <Wrapper>
      <i className="fas fa-stopwatch fa-3x"></i>
      <p id="counter">{time}s</p>
    </Wrapper>
  );
};

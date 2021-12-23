import React from 'react';
import { useState } from 'react';
import { CountDownComponent } from './component/CountDown';
import { Wrapper, ButtonWrapper } from './App.styled';

function App() {
  const [ number, setNumber] = useState(0);
  const changeNumber = () => {
    const randomNumber = Math.round((Math.random() * 10) + 1);
    setNumber(randomNumber);
  };
  const onDoneFunction = () => {
    console.log('onDone function...');
  }
  return (
    <Wrapper className="App">
      <h1>Countdown component</h1>
      <CountDownComponent nb={number} onDone={onDoneFunction}/>
      <ButtonWrapper onClick={changeNumber}>Change 'nb' prop</ButtonWrapper>
      <div className='infos'>When counter reaches 0, "onDone function" appears in the console and counter starts again</div>
    </Wrapper>
  );
}

export default App;

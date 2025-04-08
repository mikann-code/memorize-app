import React, { useState, useContext, useRef } from 'react';
import './MyCraft.css';
import { AppContext } from '../../useContext.js';
import { Button } from '@mui/material';

export const MyCraftPage = () => {

  const { qaList } = useContext(AppContext);
  //qaListを持ってくる、直接触らないもの

  const [newQaList, setNewQaList] = useState(qaList);
  //qaListに直接変更しない
  const [currentNewQaList, setCurrentNewQaList] = useState(
    { content: "Are you ready ?", word: "(OKボタンを押すと答えが表示されます)" });
  //現在の出題単語
  const [isDisabled, setIsDisabled] = useState(false);
  const [count, setCount] = useState(0);
  const [displayedAnswer, setDisplayedAnswer] = useState(false);
  const answerRef = useRef();

  const getRandomWord = () => {
    if (newQaList.length === 0) return;

    let randomIndex;
    let newWord;
    
    do {
      randomIndex = Math.floor(Math.random() * newQaList.length);
      newWord = newQaList[randomIndex];
    } while (newWord.id === currentNewQaList.id); // 直前の単語と違うか確認

    setCurrentNewQaList(newWord);
    setCount((prevCount) => { return prevCount + 1; });
  };

  const handleGameStart = () => {
    setIsDisabled(true);
    setCount(0);
    setCurrentNewQaList({ content: "Loading...", word: "(OKボタンを押すと答えが表示されます)" });
    setDisplayedAnswer(false);
    getRandomWord();
  };


  const handleNextGameStart = (e) => {
    if (e.key === "Enter" && e.target.value.trim() === currentNewQaList.word) {
      const clearNewQaList = newQaList.filter((item) => item.id !== currentNewQaList.id); // 正解の単語を削除

      setNewQaList(clearNewQaList);  //ここが適切かどうか(非同期処理が考慮できているか)
      answerRef.current.value = "";
      setDisplayedAnswer(false);

      if (clearNewQaList.length > 0 && count < 5) {
        setTimeout(() => { getRandomWord() }, 200);
      } else {
        setTimeout(() => {
          alert("ゲーム終了！すべての単語をクリアしました");
          setIsDisabled(false);
          setDisplayedAnswer(false);
          setCurrentNewQaList({ content: "Are you ready ?", word: "(OKボタンを押すと答えが表示されます)" });
          setNewQaList([...qaList]); // newQaList をリセット
          setCount(0);
        }, 200);
      }
    }
  };

  const handleDisplayAnswer = () => {
    setDisplayedAnswer(true);
  }

  return (
    <section className='myCraft'>
      <div className="list">
        <h2 className='listHeading'>- 自作コース -</h2>
        <p className="listContent">{currentNewQaList.content}</p>
        <input type="text"
          className='listAnswer'
          ref={answerRef}
          onKeyDown={handleNextGameStart}
        />
      </div>
      <Button variant='contained' color='secondary' onClick={handleGameStart} disabled={isDisabled}>Game Start</Button>

      <section className='container'>
        <div className='flex'>
          <p>正解を確認しますか?</p>
          <button onClick={handleDisplayAnswer}>OK</button>
        </div>
        <p className='answer' >{displayedAnswer ? currentNewQaList.word : "(OKボタンを押すと答えが表示されます)"}</p>
      </section>

    </section>
  )
}

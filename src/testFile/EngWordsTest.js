import React, { useState, useRef } from 'react'
import { Button } from '@mui/material'
import './test.css';
import { FirstWords, SecondWords, ThirdWords, ForthWords, FifthWords, SixthWords } from '../wordsFile/EnglishWords';

export const EngWordsTest = () => {

  const VerbWords = FirstWords;//初期値

  const [words, setWords] = useState(VerbWords);
  const [currentWord, setCurrentWord] = useState({ content: "Are you ready ?", word: "(OKボタンを押すと答えが表示されます)" });
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("first");
  const [count, setCount] = useState(0);
  const [displayedAnswer, setDisplayedAnswer] = useState(false);
  const answerRef = useRef();

  const getRandomWord = () => {
    if (words.length === 0) return;

    let randomIndex;
    let newWord;
    do {
      randomIndex = Math.floor(Math.random() * words.length);
      newWord = words[randomIndex];
    } while (newWord.id === currentWord.id);

    setCurrentWord(words[randomIndex]);
    setCount((prevCount) => { return prevCount + 1 });
  }

  const handleGameStart = () => {
    setIsDisabled(true);
    setCount(0);
    setCurrentWord({ content: "Loading...", word: "(OKボタンを押すと答えが表示されます)" });
    setDisplayedAnswer(false); //正解が出るのを防ぐ
    getRandomWord();
  }

  const handleNextGameStart = (e) => {
    if (e.key === "Enter" && e.target.value.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      const clearWords = words.filter((word) => word.id !== currentWord.id); // 正解の単語を削除
      setWords(clearWords);
      answerRef.current.value = "";
      setDisplayedAnswer(false); //正解が出るのを防ぐ


      if (clearWords.length > 0 && count < 5) {
        setTimeout(() => { getRandomWord(); }, 200);
      } else {
        setTimeout(() => {
          alert("ゲーム終了！すべての単語をクリアしました");
          setIsDisabled(false);
          setDisplayedAnswer(false);
          setCurrentWord({ content: "Are you ready ?", word: "(OKボタンを押すと答えが表示されます)" });
          setWords([...VerbWords]);
          setCount(0);

          if (selectedLevel === "first") {  //選択されたレベルの保持
            setWords(FirstWords);
          } else if (selectedLevel === "second") {
            setWords(SecondWords);
          } else if (selectedLevel === "third") {
            setWords(ThirdWords);
          } else if (selectedLevel === "forth") {
            setWords(ForthWords);
          } else if (selectedLevel === "fifth") {
            setWords(FifthWords);
          } else {
            setWords(SixthWords);
          }
        }, 200);
      }
    }
  }


  const handleDisplayAnswer = () => {
    setDisplayedAnswer(true);
  }

  const handleChangeSelect = (e) => {
    setSelectedLevel(e.target.value);

    if (e.target.value === "first") {
      setWords(FirstWords);
    } else if (e.target.value === "second") {
      setWords(SecondWords);
    } else if (e.target.value === "third") {
      setWords(ThirdWords);
    } else if (e.target.value === "forth") {
      setWords(ForthWords);
    } else if (e.target.value === "fifth") {
      setWords(FifthWords);
    } else {
      setWords(SixthWords);
    }
  }

  return (
    <section className='test'>
      <div className="list">
        <h2 className='listHeading'>- 高校英単語コース -</h2>
        <p className="listContent">{currentWord.id} {currentWord.content}</p>
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
        <p className='answer'>{displayedAnswer ? currentWord.word : "(OKボタンを押すと答えが表示されます)"}</p>
      </section>

      <section className="level">
        <p>レベルを選択してください</p>
        <select name="" id="" className="levelList" onChange={handleChangeSelect}>
          <option value="first">初級動詞</option>
          <option value="second">初級その他</option>
          <option value="third">中級動詞</option>
          <option value="forth">中級その他</option>
          <option value="fifth">中級その他</option>
          <option value="sixth">上級動詞</option>
        </select>

        <div className="statement">
          <p>
            その他の項目には、名詞など動詞以外の品詞が含まれています。品詞の違いにも注目して学習を進めていきましょう。
          </p>
        </div>
      </section>



    </section>
  )
}

import React, { useRef, useContext } from 'react'
import './Make.css'
import { Button } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AppContext } from '../../useContext.js'; 
import { auth  } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const MakePage = () => {
  const [user] = useAuthState(auth);  //ユーザーのログイン状態の管理

  const { qaList, setQaList } = useContext(AppContext);

  const wordRef = useRef();
  const contentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const word = wordRef.current.value;
    const content = contentRef.current.value;

    if (word && content) {
      setQaList([...qaList, { word: word, content: content, id: uuidv4() }]);
      wordRef.current.value = "";
      contentRef.current.value = "";
    } else {
      alert("単語と内容を入力してください");
    }
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();
    if (!window.confirm("Are you OK ?")) {
      return;
    }
    const newQaList = qaList.filter((item) => e.target.id !== item.id);
    setQaList(newQaList);
  }

  return (
    <>
    {user ?  (
      <section className="make">
      <div className='list'>
        <p className='listHeading'>Words</p>
        <div className='listWord'>
          <p>単語</p>
          <input type="text" ref={wordRef} />
        </div>
        <div className='listContent'>
          <p>内容</p>
          <textarea  ref={contentRef}></textarea>
        </div>
      </div>

      <div className="container">
        <Button variant='contained'
          color='secondary'
          onClick={handleSubmit}
          className='submitButton'
        >SUBMIT</Button>
      </div>

      <div className='createdLists'>
        <h2 className='createdListHeading'>My Q&A List</h2>
        {qaList.map((item) => {
          return (
            <div key={item.id} className='createdList'>
              <p>単語 : {item.word}</p>
              <p>内容 : {item.content}</p>
              <DeleteForeverIcon className="deleteButton"
                id={item.id} onClick={handleDeleteItem} />
            </div>
          )
        })}
      </div>
    </section>
    ) : (
    <div className='attention'> 
      <p>ログインしてご利用ください</p>
    </div>
    )
    }
    </>
  )
}




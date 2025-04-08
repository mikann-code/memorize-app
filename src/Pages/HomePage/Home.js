import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import { AppContext } from '../../useContext';
import { auth  } from "../../firebase/firebase";
import { useAuthState } from 
"react-firebase-hooks/auth";

export const HomePage = () => {

  const [user] = useAuthState(auth); 
  const { goals } = useContext(AppContext);
  
  return (
    <>
    {user?(
    <section className='home'>

      <Link to="my-goal" className='link black' >
        <div className="goalItem">
          {goals.length > 0 && (    //Reactの参考書を参照
            <p className='restDay'>
              残りの日数: {goals[0].rest === 0 ? "当日" : `${goals[0].rest}日`}
            </p>
          )}
          <h2 className="goal" >{goals.length > 0 ? "目標:" + goals[0].goal :"目標が設定されていません"}</h2>
        </div>
      </Link>

      <Link to="/my-craft" className='link white'>
        <div className="item">
          -- 自分のコース --
        </div>
      </Link>

      <Link to="english-words-test"className='link'>
        <div className="item">
         高校英語
        </div>
      </Link>

      <Link to="/other" className='link'>
        <div className="item">
          中学英語
        </div>
      </Link>
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

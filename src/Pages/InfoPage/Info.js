import React from 'react';
import './Info.css';
import { AccountCircle, Home, CreateSharp ,SentimentSatisfiedAlt } from '@mui/icons-material';

export const InfoPage = () => {
  return (
    <section className='information'>
      <section className='content'>
        <h1>-このアプリの使用方法-</h1>
        <p>
          このアプリケーションは、自分で暗記したい単語をMAKEで記録し、HOMEからテストすることができます。また、すでに登録されているテストも自由に利用可能です。このアプリケーションをうまく活用して、たくさんの単語を暗記していきましょう。。
        </p>
      </section>

      <section className='stepList'>
        <div className='step'>
          <AccountCircle />
          <p>Login</p>
        </div>

        <span>→</span>

        <div className='step'>
          <CreateSharp />
          <p>making</p>
        </div>

        <span>→</span>

        <div className='step'>
          <Home />
          <p>try test</p>
        </div>

        <span>→</span>

        <div className='step'>
          <SentimentSatisfiedAlt/>
          <p>memory</p>
        </div>
      </section>
    </section>
  )
}

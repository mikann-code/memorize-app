import React, { useState, useContext, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer.js';
import './App.css'

import { AppContext } from './useContext';
import { db } from "./firebase/firebase";
import { collection, setDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

const App = () => {

  //データベースのデータセット(ログイン中)
  const [user] = useAuthState(auth);
  const { qaList, todos, goals ,setQaList ,setTodos ,setGoals} = useContext(AppContext);

  useEffect(() => {
    const saveData = async () => {
      if (!user) return;
      try {
        await setDoc(doc(db, "userData", user.uid), {
          qaList: qaList,
          todos: todos,
          goals: goals,
        }, { merge: true });
        console.log("書き込み成功");
      } catch (error) {
        console.error("書き込みエラー:", error);
      }
    };
    saveData();
  }, [qaList, todos, goals]);

  
  //ログイン時のデータ獲得
  const fetchUserData = async (user, setQaList, setTodos, setGoals) => {
    if (!user) return;
    try {
      const docRef = doc(db, "userData", user.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("取得したデータ:", data);
        setQaList(data.qaList || []);
        setTodos(data.todos || []);
        setGoals(data.goals || []);
      } else {
        console.log("データが存在しません");
      }
    } catch (error) {
      console.error("データ取得エラー:", error);
    }
  };

  useEffect(() => {
    if (user) {

      fetchUserData(user, setQaList, setTodos, setGoals);
    }
  }, [user]);

 
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;



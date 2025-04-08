import React, { useState, createContext } from 'react';

// 初回レンダリング時に localStorage からデータを取得
const AppContext = createContext();

// コンポーネントの作成
const AppProvider = ({ children }) => {

  const [qaList, setQaList] = useState(() => {
    const savedQaList = localStorage.getItem("qaList");
    return savedQaList ? JSON.parse(savedQaList) : [];
  });

  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("goals");
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const [todos, setTodos] = useState(() => {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    });
  
  return (
    <AppContext.Provider value={{ qaList, setQaList ,goals,setGoals,todos,setTodos}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider }; // 複数の要素をエクスポート






  

  


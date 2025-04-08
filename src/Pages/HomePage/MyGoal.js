import React, { useRef, useState, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import "./MyGoal.css";
import DeleteForever from '@mui/icons-material/DeleteForever';
import { AppContext } from '../../useContext';

export const MyGoalPage = () => {

  const { goals, setGoals } = useContext(AppContext);
  const goalRef = useRef();
  const today = new Date().toISOString().split("T")[0]; // 今日の日付を YYYY-MM-DD 形式に変換
  const [selectedDate, setSelectedDate] = useState(today);


  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  }
  

  // 残りの日数を計算
  const getRemainingDays = (goalDate) => {

    const selected = new Date(goalDate); 
    const now = new Date(today);
    const difference = selected - now; // ミリ秒単位
    // console.log(difference);
    return (Math.ceil(difference / (1000 * 60 * 60 * 24))); // 日数に変換
    // 例 1,2,3(日)
    //Math.ceilで切り上げ
  };

  
  const handleGoalSet = () => {
    if (goalRef.current.value === "" || getRemainingDays(selectedDate) < 0) return;

    if(goals.length === 4){
      window.alert("目標の設定は5つ以内までです");
        return;
    }

    const newGoal = {
      goal: goalRef.current.value,    //目標
      date: new Date(selectedDate),   //締め切り
      rest: getRemainingDays(selectedDate),       //残りの日数
      id: uuidv4(),
    };
    const newGoals = [...goals, newGoal].sort((a, b) => a.rest - b.rest);
    setGoals(newGoals);
    goalRef.current.value = "";
  }

  const handleDeleteItem = (e) => {
    if (!window.confirm("設定した目標を消してもいいですか?")) return;
    const newGoals = goals.filter((goal) => e.target.id !== goal.id);
    setGoals(newGoals);
  }

  //残りの日数の更新
  useEffect(() => {
    const interval = setInterval(() => {
      if (new Date().getHours() === 0 && new Date().getMinutes() === 0) {
        console.log("1日経過");
      // ここに実行したい処理を追加
      const updateGoals = goals.map((goal) => {   //残り日数の更新
        return{
          ...goal,
          rest:goal.rest - 1 ,
        }
      })
      const filteredGoals = updateGoals.filter((goal) => {
        return goal.rest >= 0;
      })
      setGoals(filteredGoals);
    }
    }, 1000 * 30 );  //50秒
    return () => clearInterval(interval);
  },[goals])

  

  return (
    <div className='goal'>
      <div className='goalItem'>
        <input type="text" ref={goalRef} />
        <input type="date" onChange={handleDateChange} />
        <button onClick={handleGoalSet}>OK</button>
      </div>
      {goals.map((goal) => {
        return (
          <div key={goal.id} className="goalItem">
            <div className='container'>
              <p className='restDay'>
                残りの日数: {goal.rest === 0 ? "当日" : `${goal.rest}日`}
              </p>
              <DeleteForever className='icon' onClick={handleDeleteItem} id={goal.id} />
            </div>
            <h2>目標:{goal.goal}</h2>
          </div>
        )
      })}
    </div>
  )
}

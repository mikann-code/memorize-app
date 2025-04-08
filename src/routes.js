import {  createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage }  from "./Pages/HomePage/Home";
import { EngWordsTest } from "./testFile/EngWordsTest"
import { OtherTest } from "./testFile/OtherTest"
import SignUp from "./firebase/SignUp";
import { MakePage } from "./Pages/MakePage/Make";
import { TodoPage } from "./Pages/TodoPage/Todo";
import { InfoPage } from "./Pages/InfoPage/Info";
import { MyCraftPage } from "./Pages/HomePage/MyCraft";
import { MyGoalPage } from "./Pages/HomePage/MyGoal";


const routes = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      { path:"/",element:<HomePage/>},
      { path:"/english-words-test",element:<EngWordsTest/>},
      { path:"/other",element:<OtherTest/>},
      { path:"/signup", element:<SignUp/>},
      { path:"/my-craft",element:<MyCraftPage/>},
      { path:"/my-goal",element:<MyGoalPage/>},
      { path:"/making",element:<MakePage/>},
      { path:"/todo",element:<TodoPage/>},
      { path:"/info",element:<InfoPage/>},
    ],
  },
]);
  
export default routes;






import React, {useEffect} from "react";
import Loading from "./Components/Loading";
import './App.css'
import Actions from 'Redux/Actions'
import {useDispatch} from "react-redux";
const { getArticle } = Actions



const Routerr = React.lazy(() => import('./Router'));



function App() {
const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getArticle());
    }, []);
  return (
          <React.Suspense fallback={<Loading />}>
              <Routerr />
          </React.Suspense>
  );
}

export default App;

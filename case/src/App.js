import React, {useEffect} from "react";
import Loading from "./Components/Loading";
import './App.css'
import {useDispatch} from "react-redux";
import ArticleActions from "./Redux/Actions/ArticleActions";

const {getArticle} = ArticleActions



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

import {
  GET_ARTICLE_ERROR,
  GET_ARTICLE_PENDING,
  GET_ARTICLE_SUCCESS,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
} from 'Redux/Actiontypes';

const initialState = {
  articles: [],
  error: '',
  isLoading: false,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLE_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: action.data,
        isLoading: false,
      };
    case UPDATE_ARTICLE:
      const updatedArticles = state.articles.map((article) => {
        if (article.id === action.data.id) {
          return { ...article, ...action.data };
        }
        return article;
      });
      return {
        ...state,
        articles: updatedArticles,
      };
    case DELETE_ARTICLE:
      const filteredArticles = state.articles.filter(
        (article) => article.id !== action.data.id
      );
      return {
        ...state,
        articles: filteredArticles,
      };
    case GET_ARTICLE_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default articleReducer;

import {GET_ARTICLE_PENDING, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR, UPDATE_ARTICLE} from 'Redux/Actiontypes'
import {httpGetRequest} from 'Redux/services/getData'

const paramsArticle = {
    q: 'apple',
    from: '2023-11-08',
    to: '2023-11-08',
    sortBy: 'popularity',
    apiKey: 'affdfb7ea4f74e54a3992b7b7d95761a'
};


const getArticleError = (error) => {
    return {
        type: GET_ARTICLE_ERROR,
        error
    }
}

const getArticlePending = () => {
    return {
        type: GET_ARTICLE_PENDING,
    }
}

const getArticleSuccess = (data) => {
    return {
        type: GET_ARTICLE_SUCCESS,
        data
    }
}


const getArticle = () => dispatch => {
    dispatch(getArticlePending());
    console.log('Dispatching getArticlePending');
    httpGetRequest('https://newsapi.org/v2/everything', paramsArticle)
        .then(data => {
            dispatch(getArticleSuccess(data));
        })
        .catch(error => {
            dispatch(getArticleError(error));
        });
}

const updateArticle = (data) => {
    return {
        type: UPDATE_ARTICLE,
        data
    }
}

const Actions = {getArticle, updateArticle};
export default Actions;
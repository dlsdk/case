import { createSelector } from 'reselect';

const selectArticleReducer = (state) => state.articleReducer;

export const selectArticle = createSelector(
    [selectArticleReducer],
    (articleReducer) =>{ console.log("neee : ", articleReducer);
        return articleReducer.articles;}
);

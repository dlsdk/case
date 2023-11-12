import { createSelector } from 'reselect';

const selectArticleReducer = (state) => state.articleReducer;
const selectUserReducer = (state) => state.userReducer;

export const selectArticle = createSelector(
    [selectArticleReducer],
    (values) => values.articles
);

export const selectUser = createSelector(
    [selectUserReducer],
    (values) => values.user.data
);
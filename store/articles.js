export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
export const FETCH_START = 'FETCH_START';
export const FETCH_END = 'FETCH_END';

export const state = () => ({
  list: [],
  limit: 5,
  currentPage: 1,
  isFetching: false,
});

export const mutations = {
  [UPDATE_ARTICLES](state, newArticlesList) {
    state.list = newArticlesList;
  },
  [FETCH_START](state) {
    state.isFetching = true;
  },
  [FETCH_END](state) {
    state.isFetching = false;
  },
};

export const actions = {
  fetchByType() {},
  fetchMore() {},
};

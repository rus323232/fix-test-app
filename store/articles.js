import { http } from '@/modules/http';

export const SET_TYPE = 'SET_TYPE';
export const FETCH_END = 'FETCH_END';
export const FETCH_START = 'FETCH_START';
export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const SET_FIRST_PAGE = 'SET_FIRST_PAGE';
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';

const filterByType = (currentType, articles) =>
  articles.filter(({ type }) => type === currentType);

export const state = () => ({
  list: [],
  limit: 5,
  type: null,
  currentPage: 1,
  isFetching: false,
});

export const mutations = {
  [UPDATE_ARTICLES](state, newArticlesList) {
    state.list = newArticlesList;
  },
  [INCREMENT_PAGE](state) {
    state.currentPage += 1;
  },
  [SET_FIRST_PAGE](state) {
    state.currentPage = 1;
  },
  [SET_TYPE](state, newType) {
    state.type = newType;
  },
  [FETCH_START](state) {
    state.isFetching = true;
  },
  [FETCH_END](state) {
    state.isFetching = false;
  },
};

export const actions = {
  async fetchList({ commit, state }) {
    try {
      commit(FETCH_START);

      const { page, limit, type } = state;
      const { data } = await http.get('articles', {
        params: {
          page,
          limit,
        },
      });

      if (!data || !data.length) return [];

      if (!type) {
        commit(UPDATE_ARTICLES, data);
        return;
      }

      commit(UPDATE_ARTICLES, filterByType(type, data));
    } catch (e) {
      console.error('fetchList action', e);
    } finally {
      commit(FETCH_END);
    }
  },
  async fetchByType({ commit, dispatch }, payload) {
    const { type = null } = payload;

    commit(SET_FIRST_PAGE);
    commit(SET_TYPE, type);
    dispatch('fetchList');
  },
  async fetchMore({ commit, dispatch }) {
    commit(INCREMENT_PAGE);
    dispatch('fetchList');
  },
};

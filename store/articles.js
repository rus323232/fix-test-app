import { http } from '@/utils';
import { ARTICLE_TYPES } from '@/constants';

export const SET_TYPE = 'SET_TYPE';
export const FETCH_END = 'FETCH_END';
export const FETCH_START = 'FETCH_START';
export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const SET_FIRST_PAGE = 'SET_FIRST_PAGE';
export const CLEAR_ARTICLES = 'CLEAR_ARTICLES';
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
export const SET_IS_OVER_STATUS = 'SET_IS_OVER_STATUS';

const getUriByType = type => {
  const uriMap = {
    stock: 'stocks',
    blog: 'blogs',
    news: 'news',
  };
  return Boolean(type) ? uriMap[type] : 'articles';
};

/**
 * Функция заменяет в рандомном порядке целые числа в типах статьи, на читаемые строковые значения
 * так как mock сервер не дает возможности генерировать выборку из набора строковых значений
 * */
const getArticlesWithTypes = articles =>
  articles.map(article => {
    const typeInt = parseInt(article.type, 10);

    if (isNaN(typeInt)) return article;

    const remainder = typeInt % 10;

    return {
      ...article,
      type:
        remainder < 3
          ? ARTICLE_TYPES.blog.value
          : remainder < 6
          ? ARTICLE_TYPES.news.value
          : ARTICLE_TYPES.stock.value,
    };
  });

export const state = () => ({
  list: [],
  limit: 5,
  type: null,
  currentPage: 1,
  isFetching: false,
  isArticlesOver: false,
});

export const mutations = {
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
  [CLEAR_ARTICLES](state) {
    state.list = [];
  },
  [UPDATE_ARTICLES](state, newArticlesList) {
    state.list = newArticlesList;
  },
  [SET_IS_OVER_STATUS](state, status = false) {
    state.isArticlesOver = status;
  },
};

export const actions = {
  async fetchList({ commit, state }, payload) {
    try {
      commit(FETCH_START);

      const { currentPage: page, limit, type } = state;
      const uri = getUriByType(type);
      const { data } = await http.get(uri, {
        params: {
          page,
          limit,
        },
      });

      if (!Array.isArray(data)) return [];

      const dataWithReadableTypes = getArticlesWithTypes(data);

      if (data.length < limit) {
        commit(SET_IS_OVER_STATUS, true);
      }

      return dataWithReadableTypes;
    } catch (e) {
      console.error('fetchList action', e);
      throw new Error(e);
    } finally {
      commit(FETCH_END);
    }
  },
  async fetchDetail({ commit, state }, { id }) {
    try {
      const { type } = state;
      const uri = `${getUriByType(type)}/${id}`;
      const { data } = await http.get(uri);

      return data;
    } catch (e) {
      console.error('fetchDetail action', e);
      throw new Error(e);
    }
  },
  async fetchByType({ commit, dispatch }, payload = {}) {
    const { type = null } = payload;

    commit(SET_IS_OVER_STATUS, false);
    commit(CLEAR_ARTICLES);
    commit(SET_FIRST_PAGE);
    commit(SET_TYPE, type);

    const articles = await dispatch('fetchList');

    commit(UPDATE_ARTICLES, articles);
  },
  async fetchMore({ commit, dispatch, state }) {
    if (state.isArticlesOver) return;

    commit(INCREMENT_PAGE);

    const articles = await dispatch('fetchList');

    commit(UPDATE_ARTICLES, [...state.list, ...articles]);
  },
};

export const getters = {
  isNewListEmpty: ({ isFetching, list }) => !isFetching && list.length === 0,
  isNewListFetching: ({ isFetching, list }) => isFetching && list.length === 0,
};

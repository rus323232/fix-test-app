export const ARTICLE_TYPES = {
  blog: {
    title: 'Блог',
    value: 'blog',
  },
  news: {
    title: 'Новости',
    value: 'news',
  },
  stock: {
    title: 'Акции',
    value: 'stock',
  },
};

export const STORE_MODULES = {
  articles: 'articles',
};

export const ERROR_MESSAGES = {
  notFound: {
    code: 404,
    message: 'Запрашиваемый ресурс не найден',
  },
  serverError: {
    code: 500,
    message: 'Ошибка обработки данн',
  },
  unknownError: {
    message: 'Ошибка соединения с сервером',
  },
};

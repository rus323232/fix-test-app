export const ARTICLE_TYPES = [
  {
    title: 'Блог',
    value: 'blog',
  },
  {
    title: 'Новости',
    value: 'news',
  },
  {
    title: 'Акции',
    value: 'stock',
  },
];

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
    message: 'Ошибка обработки данных',
  },
  unknownError: {
    message: 'Ошибка соединения с сервером',
  },
};

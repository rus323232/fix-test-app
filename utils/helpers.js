import { ERROR_MESSAGES } from '@/constants';

export const getHttpError = status => {
  const { notFound, serverError, unknownError } = ERROR_MESSAGES;
  const errorsMap = {
    [notFound.code]: {
      title: notFound.code,
      text: notFound.message,
    },
    [serverError.code]: {
      title: serverError.code,
      text: serverError.message,
    },
    default: {
      text: unknownError.message,
    },
  };

  if (errorsMap.hasOwnProperty(status)) {
    return errorsMap[status];
  } else {
    return errorsMap['default'];
  }
};

export const formatDate = date => {
  const dateInstance = new Date(date);
  const dd = dateInstance.getDate();
  const mm = dateInstance.getMonth();
  const yyyy = dateInstance.getFullYear();

  if (isNaN(dd) || isNaN(mm) || isNaN(yyyy)) {
    console.error('Invalid date format');
    return null;
  }

  return `${dd}.${mm}.${yyyy}`;
};

export const splitByBits = value =>
  `${value}`
    .replace(/[^0-9]+/g, '')
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

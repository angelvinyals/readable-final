export const getCategoriesisLoading = ({ status, ...categories}) =>
  status.loading;

export const getCategoriesFetchError = ({ status, ...categories}) =>
    status.error;

export const getCategoriesFromStore = ({ status, ...categories}) => {
  if (status.error === true) {
    return [];
  }

  return Object.keys(categories)
    .map(key => ({
      id: key,
      name: categories[key].name,
      path: categories[key].path,
    }));
};

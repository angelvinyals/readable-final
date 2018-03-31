export const getCategoriesisLoading = ({ categoriesReducer }) =>
  categoriesReducer.status.loading;

export const getCategoriesFetchError = ({ categoriesReducer }) =>
  categoriesReducer.status.error;

export const getCategories = ({ categoriesReducer }) => {
  if (categoriesReducer.status.error === true) {
    return [];
  }

  return Object.keys(categoriesReducer)
    .filter(key => key !== 'status')
    .map(key => ({
      id: key,
      name: categoriesReducer[key].name,
      path: categoriesReducer[key].path,
    }));
};

export const validCategoryUrl = ({ categoriesReducer }, urlParam) => {
  if (categoriesReducer[urlParam] !== undefined) return true;
  return false;
};

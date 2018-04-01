export const getFilteredPosts = (postsReducer, CategoryFilter) => {
  console.log(postsReducer)
  console.log(CategoryFilter)
  if (postsReducer.postStatus.loading === true || postsReducer.postStatus.error === true) {
    return [];
  }

  if(Object.keys(postsReducer).filter(key => key !== 'postStatus').length===0){
    return [];
  }

  let postArrayFilteredByCategoryNotDeleted = [];
  const postArray = convertPostObjToArray(postsReducer);
  if (CategoryFilter === undefined) {
    postArrayFilteredByCategoryNotDeleted =  postArray.filter(p => p.deleted === false);
  } else {
    postArrayFilteredByCategoryNotDeleted =  postArray.filter(p => p.deleted === false && p.category === CategoryFilter);
  }

  return postArrayFilteredByCategoryNotDeleted;
};

export const convertPostObjToArray = postObj =>
  Object.keys(postObj)
    .filter(key => key !== 'postStatus')
    .map(key => ({
      id: key,
      timestamp: postObj[key].timestamp,
      title: postObj[key].title,
      body: postObj[key].body,
      author: postObj[key].author,
      category: postObj[key].category,
      voteScore: postObj[key].voteScore,
      deleted: postObj[key].deleted,
      commentCount: postObj[key].commentCount,
    }));

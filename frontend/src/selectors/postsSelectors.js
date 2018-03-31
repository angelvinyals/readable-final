export const getFilteredPosts = ({postsReducer}) => {
  console.log(postsReducer)
  if (postsReducer.postStatus.loading === true || postsReducer.postStatus.error === true) {
    return [];
  }

  if(Object.keys(postsReducer).filter(key => key !== 'postStatus').length===0){
    return [];
  }

  let postNotDeleted = [];
  const postArray = convertPostObjToArray(postsReducer);
    postNotDeleted = postArray.filter(p => p.deleted === false);

  return postNotDeleted;
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

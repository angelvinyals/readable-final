export const getFilteredPosts = (postsReducer, CategoryFilter) => {
  const { postStatus, sortPosts, ...posts} = postsReducer
  //console.log(postsReducer)
//  console.log(postStatus)
//  console.log(sortPosts)
//  console.log(posts)
//  console.log(CategoryFilter)

  if (postStatus.loading === true || postStatus.error === true) {
    return [];
  }

  let postArrayFilteredByCategoryNotDeleted = [];
  const postArray = convertPostObjToArray(posts);
  if (CategoryFilter === undefined) {
    postArrayFilteredByCategoryNotDeleted =  postArray.filter(p => p.deleted === false);
  } else {
    postArrayFilteredByCategoryNotDeleted =  postArray.filter(p => p.deleted === false && p.category === CategoryFilter);
  }

  switch(sortPosts.sortBy) {
    case 'NEW':
      return sortPostsByNewestDate(postArrayFilteredByCategoryNotDeleted);
    case 'OLD':
      return sortPostsByOldestDate(postArrayFilteredByCategoryNotDeleted);
    case 'HIGHEST_VOTE':
      return sortPostsByHighestVote(postArrayFilteredByCategoryNotDeleted);
    case 'LOWEST_VOTE':
      return sortPostsByLowestVote(postArrayFilteredByCategoryNotDeleted);
    default:
      return [{id:1, title:"returnet as default SWITCH SORT POST .not sorted... there is an error", body:"",author:"app",category:"react",voteScore:1000,deleted:false,commentCount:0}];
  }

  return [{id:2, title:"return without pass switch sortPost... there is an error", body:"",author:"app",category:"react",voteScore:1000,deleted:false,commentCount:0}];
};

export const convertPostObjToArray = postObj =>
  Object.keys(postObj)
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

export const sortPostsByNewestDate = postsArray =>
  postsArray.sort((prev, next) => {
    if (prev.timestamp > next.timestamp) {
      return -1;
    }
    return 1;
  });

export const sortPostsByHighestVote = postsArray =>
postsArray.sort((prev, next) => {
  if (prev.voteScore > next.voteScore) {
    return -1;
  }
  return 1;
});

export const sortPostsByLowestVote = postsArray =>
  postsArray.sort((prev, next) => {
    if (prev.voteScore > next.voteScore) {
      return 1;
    }
    return -1;
  });



export const sortPostsByOldestDate = postsArray =>
  postsArray.sort((prev, next) => {
    if (prev.timestamp > next.timestamp) {
      return 1;
    }
    return -1;
  });

export const selectPostByPostId = ({ postStatus, sortPosts, ...posts}, postId) => {
  if (postStatus.error === true) {
    return [];
  }
  console.log(posts)
  if (posts.lenght===0) {
    return [];
  } else{
    return posts[postId]

  }
/*
  if (typeof(posts[postId]) !== undefined) {
    return Object.keys(posts[postId])
      .map(key => ({
        id: key.id,
        timestamp: key.timestamp,
        title: key.title,
        body:key.body,
        author:key.author,
        category: key.category,
        voteScore: key.voteScore,
        deleted: key.deleted,
        commentCount: key.commentCount
      }));
  }
*/
  return [];
};

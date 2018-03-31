import {
  convertPostObjToArray,
  getFilteredPosts,
  selectPostByPostId,
  sortPostsByHighestVote,
  sortPostsByLowestVote,
  sortPostsByNewestDate,
  sortPostsByOldestDate,
  validPostUrl,
} from './postsSelectors';


describe('selectors for posts', () => {
  it('should fail gracefully if posts are undefined', () => {
    const selectedState = {
        postStatus: { error: true, loading: false },
      };

    const expectedValue = [];
    expect(getFilteredPosts(selectedState)).toEqual(expectedValue);
  });
  it('should convert an object to array of objects', () => {
    const selectedState ={
        '8xf0y6ziyjabvozdd253nd': {
            "id": "8xf0y6ziyjabvozdd253nd",
            "timestamp": 1467166872634,
            "title": "Udacity is the best place to learn React",
            "body": "Everyone says so after all.",
            "author": "thingtwo",
            "category": "react",
            "voteScore": 6,
            "deleted": false,
            "commentCount": 2
        },
        '6ni6ok3ym7mf1p33lnez': {
            "id": "6ni6ok3ym7mf1p33lnez",
            "timestamp": 1468479767190,
            "title": "Learn Redux in 10 minutes!",
            "body": "Just kidding. It takes more than 10 minutes to learn technology.",
            "author": "thingone",
            "category": "redux",
            "voteScore": -5,
            "deleted": false,
            "commentCount": 0
        },
        postStatus: { error: false, loading: false},
      };

    const expectedArray = [
      {
          "id": "8xf0y6ziyjabvozdd253nd",
          "timestamp": 1467166872634,
          "title": "Udacity is the best place to learn React",
          "body": "Everyone says so after all.",
          "author": "thingtwo",
          "category": "react",
          "voteScore": 6,
          "deleted": false,
          "commentCount": 2
      },
      {
          "id": "6ni6ok3ym7mf1p33lnez",
          "timestamp": 1468479767190,
          "title": "Learn Redux in 10 minutes!",
          "body": "Just kidding. It takes more than 10 minutes to learn technology.",
          "author": "thingone",
          "category": "redux",
          "voteScore": -5,
          "deleted": false,
          "commentCount": 0
      },
    ];
    expect(convertPostObjToArray(selectedState)).toEqual(expectedArray);
  });

  it('should select posts as an array', () => {
    const selectedState = {

        '8xf0y6ziyjabvozdd253nd': {
            "id": "8xf0y6ziyjabvozdd253nd",
            "timestamp": 1467166872634,
            "title": "Udacity is the best place to learn React",
            "body": "Everyone says so after all.",
            "author": "thingtwo",
            "category": "react",
            "voteScore": 6,
            "deleted": false,
            "commentCount": 2
        },
        '6ni6ok3ym7mf1p33lnez': {
            "id": "6ni6ok3ym7mf1p33lnez",
            "timestamp": 1468479767190,
            "title": "Learn Redux in 10 minutes!",
            "body": "Just kidding. It takes more than 10 minutes to learn technology.",
            "author": "thingone",
            "category": "redux",
            "voteScore": -5,
            "deleted": false,
            "commentCount": 0
        },
        postStatus: {
          error: false,
          loading: false,
        },
      };
    const expectedShape = [
       {
          "id": "8xf0y6ziyjabvozdd253nd",
          "timestamp": 1467166872634,
          "title": "Udacity is the best place to learn React",
          "body": "Everyone says so after all.",
          "author": "thingtwo",
          "category": "react",
          "voteScore": 6,
          "deleted": false,
          "commentCount": 2
      },
      {
          "id": "6ni6ok3ym7mf1p33lnez",
          "timestamp": 1468479767190,
          "title": "Learn Redux in 10 minutes!",
          "body": "Just kidding. It takes more than 10 minutes to learn technology.",
          "author": "thingone",
          "category": "redux",
          "voteScore": -5,
          "deleted": false,
          "commentCount": 0
      },
    ];
    expect(getFilteredPosts(selectedState)).toEqual(expectedShape);
  });

});

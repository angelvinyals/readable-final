import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategoriesFromStore} from '../selectors/categoriesSelectors';
import { addPost} from '../actions/postsAddActions'

class PostAddContainer extends Component {
  state = {
      title:'',
      body:'',
      author:'',
      category:'react',
    };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleButtonChange= (e) => {
   this.setState({
     category: e.currentTarget.value
     });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newPostToAdd= this.makeAPost()
    this.props.addThisPost(newPostToAdd)
    //this.props.history.push(`/`)

  }

  makeAPost= () =>{
    console.log('make a post')
    const newPost = {
		 				title: this.state.title,
		 				body:  this.state.body,
		 				author: this.state.author,
		 				category: this.state.category,
		 			}
      console.log(newPost)
      return newPost
  }


  handleClose = () =>{
    this.props.hideModal();
  }
  render() {
    const { author, body, title } = this.state;
    const {categories}= this.props;
    console.log(categories);
    return (
      <div>
        <h5 className= "margin-top04em margin-bottom1em">POST ADD FORM</h5>
        <form id="addPost" >
        <fieldset>
          <textarea
            name='title'
            placeholder="title"
            onChange={this.handleInputChange }
          />
        </fieldset>
        <fieldset>
          <textarea
            name='body'
            placeholder="Type your post here...."
            onChange={this.handleInputChange}
          />
        </fieldset>
        <fieldset>
          <input
            name='author'
            placeholder="author"
            type="text"
            onChange={this.handleInputChange }
            />
        </fieldset>
        <fieldset>
          <p>Categories</p>
          {categories.map((cat,i)=>
                <label>
                  <input
                    type="radio"
                    key= {`modalCat${cat.id}`}
                    value={cat.name}
                    checked={this.state.category === cat.name? 'checked': ''}
                    onChange={this.handleButtonChange}
                      />
                    <span>{cat.name}</span>
                </label>
              )}
        </fieldset>
        <hr className="hr-dashed"/>
        <fieldset>
          <button
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
            onClick={this.handleSubmit}
            >Submit
          </button>
          <button
            name="cancel"
            type="cancel"
            id="contact-submit"
            onClick={this.handleClose}
            >Cancel
          </button>
        </fieldset>
        <hr className="hr-dashed"/>
      </form>
      </div>

    )
 }
};

PostAddContainer.propTypes = {
  title:PropTypes.string.isRequired,
  body:PropTypes.string.isRequired,
  author:PropTypes.string.isRequired,
  category:PropTypes.string.isRequired,
  categories: PropTypes.array,

};

const mapStateToProps = ({categoriesReducer, postsReducer}, ownProps) => ({
  categories: getCategoriesFromStore(categoriesReducer),

});

const mapDispatchToProps = dispatch => ({
  addThisPost: (newPost) => dispatch(addPost(newPost)),
});




export default connect(mapStateToProps, mapDispatchToProps)(PostAddContainer);

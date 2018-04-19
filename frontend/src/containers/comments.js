import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

class Comments extends React.Component {
	static propTypes = {
	    render: PropTypes.func.isRequired,
	    postId: PropTypes.string.isRequired,
	    url: PropTypes.string.isRequired,
	};

	state = {
	    comments: [],
	    isLoading: false,
	};

  	headers = {
		'Authorization': 'whatever-you-want',
		'content-type': 'application/json',
		'cache-control': 'no-cache',
	};

  	_fetch = async () => {
    	const res = await fetch(this.props.url, {
	    	method: 'GET',
	    	headers: {
	      		...this.headers,
	      		'Content-Type': 'application/json',
	    	},
	    });

	    const json = await res.json();
		await console.log(json)
      	await this.setState({ isLoading: false})
      	await this.props.fetchingComments(json)
	    
	}

	componentDidMount() {
	    this.setState({ isLoading: true }, this._fetch);
	}

	render() {
	    return this.props.render(this.state,this.props);
	}
}

export default Comments
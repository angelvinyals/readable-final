import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

class Posts extends React.Component {
	static propTypes = {
	    render: PropTypes.func.isRequired,
	    url: PropTypes.string.isRequired,
	};

	state = {
	    posts: [],
	    isLoading: false,
	};

  	headers = {
		Authorization: 'some-token',
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

	    this.setState({
	      posts: Object.assign({}, ...(json.map(p=> ({ [p.id]:p })))),	      	
	      isLoading: false,
	    });
	}

	componentDidMount() {
	    this.setState({ isLoading: true }, this._fetch);
	}

	render() {
	    return this.props.render(this.state);
	}
}

export default Posts
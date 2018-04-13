import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

class Categories extends React.Component {
	static propTypes = {
	    render: PropTypes.func.isRequired,
	    url: PropTypes.string.isRequired,
	};

	state = {
	    categories: [],
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

	    await this.setState({
	      categories: json.categories,
	      isLoading: false,
	    });

	    await this.props.categ(json.categories)//passing categories to homepage's state
	}

	componentDidMount() {
	    this.setState({ isLoading: true }, this._fetch);
	}

	render() {
	    return this.props.render(this.state, this.props);
	}
}

export default Categories
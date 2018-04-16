import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

class Sorting extends React.Component {
	static propTypes = {
	    type: PropTypes.object.isRequired,
	};

  	render() {
	    return this.props.render();
	}
}

export default Sorting
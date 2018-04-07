import React from "react";
import PropTypes from "prop-types";

class AjaxForm extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: "POST",
  };

  state = { 
    error: false,
  };

  headers = {
    Authorization: 'some-token',
    'content-type': 'application/json',
    'cache-control': 'no-cache',
  };

  _sendRequest = async (values, { setSubmitting }) => {
    // here you can process values however you wish
    const { url, fields, type, onSuccess } = this.props;

    try {
      const formData = new FormData();
      
      for (let field of fields) {
        formData.append(field, values[field]);
      }

      const res = await fetch(url, { 
        method: type,
        headers: {
            ...this.headers,
            'Content-Type': 'application/json',
        },
        body: formData });
      const json = await res.json();

      setSubmitting(false);
      onSuccess(json);
    } catch (error) {
      setSubmitting(false);
      this.setState({ error: error.message });
    }
  };

  render() {
    const { render } = this.props;

    return render({
      ...this.state,
      sendRequest: this._sendRequest,
    });
  }
}

export default AjaxForm
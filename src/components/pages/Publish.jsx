import React, { Component } from 'react';
import QuestionForm from '../organisms/QuestionForm';

class Publish extends Component {
  API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      input: '',
      isPublished: false,
    };
  }

  render() {
    return (
      <div>
        <QuestionForm isPublished={this.state.isPublished} />
      </div>
    );
  }
}

export default Publish;

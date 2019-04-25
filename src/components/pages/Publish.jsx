import React, { Component } from 'react';
import PublishForm from '../organisms/PublishForm';

class Publish extends Component {
  API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      input: '',
    };
  }
  publishQuestion(author, question) {
    const timestamp = new Date().toLocaleTimeString();

    let newQuestion = {
      date: timestamp,
      author: author,
      question: question,
      votes: 0,
    };

    fetch(`${this.API_URL}/Questions/`, {
      method: 'POST',
      body: JSON.stringify(newQuestion),
    })
      .then(result => {
        this.getData();
      })
      .catch(error => {
        // TODO: Inform the user about the error
        console.error('Error when adding question: ', error);
      });
  }
  render() {
    return (
      <div>
        <PublishForm publishQuestion={this.publishQuestion} />
      </div>
    );
  }
}

export default Publish;

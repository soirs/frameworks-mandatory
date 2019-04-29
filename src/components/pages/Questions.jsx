import React, { Component } from 'react';
import Fullpage from '../template/Fullpage';
import AllQuestions from '../organisms/AllQuestions';
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    const URL = 'http://localhost:8080/api/questions';
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ questions: data });
      })
      .catch(error => {
        console.error('Error when fetching question: ', error);
      });
  }

  render() {
    return (
      <Fullpage>
        <h1 className="uk-text-muted">Questions</h1>
        <br />
        <AllQuestions questions={this.state.questions} />
      </Fullpage>
    );
  }
}

export default Questions;

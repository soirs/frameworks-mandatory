import React, { Component } from 'react';
import Fullpage from '../template/Fullpage';

class SingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    const QUESTION_ID = this.props.match.params.id;
    const URL = `http://localhost:8080/api/questions/${QUESTION_ID}`;
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
        {this.state.questions.map(question => (
          <article className="uk-article" key={question._id}>
            <h1 className="uk-article-title uk-text-small">
              {question.title} <span className="uk-badge">{question.votes || 63}</span>
            </h1>
            <p className="uk-article-meta ">
              Written by{' '}
              <span className="uk-text-primary">{question.author}</span>
              <br />
              on <time dateTime={question.date}>{question.date}</time>
            </p>

            <p>{question.question}</p>

            <div className="uk-grid-small uk-child-width-auto" uk-grid="true">
              <div>
                <button className="uk-button uk-button-text" href="#">
                  5 Comments
                </button>
              </div>
            </div>
          </article>
        ))}
      </Fullpage>
    );
  }
}

export default SingleQuestion;

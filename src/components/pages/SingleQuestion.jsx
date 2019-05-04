import React, { Component } from 'react';
import Fullpage from '../template/Fullpage';
import AnswerForm from '../organisms/AnswerForm';
import AllAnswers from '../organisms/AllAnswers';

class SingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
    };
  }

  componentDidMount() {
    this.getQuestion();
    this.getAnswers();
  }

  getAnswers() {
    const URL = process.env.REACT_APP_API_ANSWERS;
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ answers: data });
      })
      .catch(error => {
        console.error('Error when fetching answers: ', error);
      });

    // console.log(this.state.answers.replyTo);
    // console.log(this.props.match.params.id);
    // console.log(
    //   (this.state.answers.replyTo === this.props.match.params.id).length
    // );
  }
  // MULTIPLE
  getQuestion() {
    const QUESTION_ID = this.props.match.params.id;
    const URL = `${process.env.REACT_APP_API_QUESTION}${QUESTION_ID}`;
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
            <h1 className="uk-text-capitalize uk-text-lead">
              {question.title}{' '}
            </h1>
            <p className="uk-article-meta ">
              Written by{' '}
              <span className="uk-text-primary">{question.author}</span>
              <br />
              on <time dateTime={question.date}>{question.date}</time>
            </p>

            <p>{question.question}</p>
            <hr className="uk uk-divider-small" />
            <div className="uk-grid-small uk-child-width-auto" uk-grid="true">
              <div>
                <p className="uk-button uk-button-text" href="#">
                  {
                    (this.state.answers.replyTo === this.props.match.params.id)
                      .length
                  }{' '}
                  Comments
                </p>
              </div>
            </div>
            <AllAnswers
              answers={this.state.answers}
              id={this.props.match.params.id}
            />
            <AnswerForm
              question={this.state.questions}
              id={this.props.match.params.id}
            />
          </article>
        ))}
      </Fullpage>
    );
  }
}

export default SingleQuestion;

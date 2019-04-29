import React, { Component } from 'react';
import Fullpage from '../template/Fullpage';

export default class AnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      answer: '',
    };

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }

  onChangeBody(event) {
    this.setState({ answer: event.target.value });
  }

  PublishAnswer(author, answer) {
    let newAnswer = {
      replyTo: this.props.id,
      author: author,
      answer: answer,
    };

    console.log(newAnswer);
    const URL =  process.env.REACT_APP_API_ANSWERS;
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(newAnswer),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => {
        console.error('Error when adding answer: ', error);
      });
  }

  // SUBMIT
  handleSubmit(event) {
    event.preventDefault();
    const { author, answer } = this.state;
    this.PublishAnswer(author, answer);
  }

  render() {
    const { author, answer } = this.state;

    return (
      <div>
        <Fullpage>
          <h1>Reply</h1>
          <hr className="uk-divider-small" />

          <div>
            <form className="uk-form-stacked">
              <div className="uk-margin">
                {/* AUTHOR */}
                <label className="uk-form-label" htmlFor="author">
                  Please enter your name
                </label>

                <div className="uk-form-controls">
                  <input
                    // required
                    className="uk-input"
                    id="author"
                    type="text"
                    placeholder="Name"
                    onChange={this.onChangeAuthor}
                    value={this.state.author}
                  />
                </div>
                <br />

                {/* AUTHOR */}
                {/* TEXTAREA */}
                <label className="uk-form-label" htmlFor="answer">
                  Please enter your answer
                </label>

                <div className="uk-form-controls">
                  <textarea
                    // required
                    className="uk-textarea"
                    id="answer"
                    type="text-area"
                    placeholder="Enter your answer"
                    onChange={this.onChangeBody}
                    value={this.state.answer}
                  />
                </div>
              </div>
              <button
                className={`uk-button uk-button-primary uk-align-right`}
                onClick={this.handleSubmit}
                disabled={!author || !answer}
              >
                Submit
              </button>
            </form>
          </div>
        </Fullpage>
      </div>
    );
  }
}

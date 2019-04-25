import React, { Component } from 'react';
import Fullpage from '../template/Fullpage';

class PublishForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: 'http://localhost:8080/api',
      author: '',
      question: '',
    };

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }
  onChangeBody(event) {
    this.setState({ question: event.target.value });
  }
  PublishQuestion(author, question) {
    let newQuestion = {
      author: author,
      question: question,
    };

    console.log(newQuestion);

    fetch(`${this.state.api}/questions/`, {
      method: 'POST',
      body: JSON.stringify(newQuestion),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .catch(error => {
        // TODO: Inform the user about the error
        console.error('Error when adding question: ', error);
      });
  }

  // SUBMIT
  handleSubmit(event) {
    event.preventDefault();
    const { author, question } = this.state;
    this.PublishQuestion(author, question);
  }
  render() {
    // const { author, question } = this.state;
    return (
      <div>
        <Fullpage>
          <h1>Publish</h1>
          <hr className="uk-divider-small" />

          <div>
            <form className="uk-form-stacked">
              {/* AUTHOR */}
              <div className="uk-margin">
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

                {/* TEXTAREA */}
                <label className="uk-form-label" htmlFor="question">
                  Please enter your question
                </label>

                <div className="uk-form-controls">
                  <textarea
                    // required
                    className="uk-textarea"
                    id="question"
                    type="text-area"
                    placeholder="Enter your question"
                    onChange={this.onChangeBody}
                    value={this.state.question}
                  />
                </div>
              </div>
              <button
                className={`uk-button uk-button-primary uk-align-right`}
                onClick={this.handleSubmit}
                // disabled={!author || !question}
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

export default PublishForm;

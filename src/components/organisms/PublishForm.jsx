import React, { Component } from 'react';
import Fullpage from '../template/Fullpage';
import Checkbox from '../atoms/Checkbox';

class PublishForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      input: '',
      isChecked: props.isChecked || false,
    };

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);

    this.isChecked = this.isChecked.bind(this);

    this.handleInput = this.handleInput.bind(this);
  }

  onChangeAuthor(event) {
    this.setState({
      author: event.target.value,
    });
  }

  onChangeBody(event) {
    this.setState({
      input: event.target.value,
    });
  }

  isChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }
  // isChecked(event) {
  //   this.setState({ isChecked: event.target.value,});
  // }

  // SUBMIT
  handleInput(event) {
    event.preventDefault();
    this.props.publishQuestion(this.state.author);
    this.props.publishQuestion(this.state.input);
  }
  render() {
    const { author, input, isChecked } = this.state;

    return (
      <div>
        <Fullpage>
          <h1>Publish</h1>
          <hr className="uk-divider-small" />

          <div>
            <form className="uk-form-stacked">
              {/* AUTHOR */}
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-author">
                  Please enter your name
                </label>

                <div className="uk-form-controls">
                  <input
                    required
                    className="uk-input"
                    id="form-author"
                    type="text"
                    placeholder="Name"
                    onChange={this.onChangeAuthor}
                  />
                </div>
                <br />

                {/* TEXTAREA */}
                <label className="uk-form-label" htmlFor="form-body">
                  Please enter your question
                </label>

                <div className="uk-form-controls">
                  <textarea
                    required
                    className="uk-textarea"
                    id="form-body"
                    type="text-area"
                    placeholder="Enter your question"
                    onChange={this.onChangeBody}
                  />
                </div>
              </div>
              {/* BOT CHECK */}
              <Checkbox isChecked />

              <br />
              <br />

              <button
                onClick={this.handleInput}
                className={`disabled uk-button uk-button-primary uk-align-right`}
                disabled={!author || !input}
                // disabled={!author || !input || !isChecked}
                // disabled={!isChecked}
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

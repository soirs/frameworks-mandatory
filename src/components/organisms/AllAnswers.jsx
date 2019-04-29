import React, { Component } from 'react';
// import VoteCount from '../atoms/VoteCount';
import VoteModifier from '../molecules/VoteModifier';
import IsLoading from '../atoms/IsLoading';

export default class AllAnswers extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    return (
      <div
        className="uk-child-width-1-2@s gap-grid-collapse"
        uk-grid="masonry: true"
      >
        {this.props.answers
          .filter(e => e.replyTo === this.props.id)
          .map(answer => {
            return this.state.IsLoading ? (
              <IsLoading />
            ) : (
              <div key={answer._id}>
                <div className="uk-card uk-card-small uk-card-default uk-card-body uk-card-hover">
                  <p className="uk-margin-remove-top">
                    <span className="uk-text-bold">{answer.author}</span>
                    <br />
                    <time dateTime={answer.date}>{answer.date}</time>
                  </p>
                  <hr />
                  <p className="uk-margin-left">{answer.answer}</p>
                  <div className="uk-card-footer">
                    <VoteModifier id={answer._id} votes={answer.votes} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

import React, { Component } from 'react';
// import VoteCount from '../atoms/VoteCount';
import VoteModifier from '../molecules/VoteModifier';

export default class AllAnswers extends Component {
  render() {
    return (
      <div
        className="uk-child-width-1-2@s gap-grid-collapse"
        uk-grid="masonry: true"
      >
        {this.props.answers
          .filter(e => e.replyTo === this.props.id)
          .map(answer => (
            <div key={answer._id}>
              <div className="uk-card uk-card-small uk-card-default uk-card-body uk-card-hover">
                <VoteModifier id={answer._id} votes={answer.votes} />

                <p className="uk-margin-remove-top">
                  <span className="uk-text-bold">{answer.author}</span>
                  <br />
                  <time dateTime={answer.date}>{answer.date}</time>
                </p>
                <p>{answer.answer}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

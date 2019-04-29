import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import VoteCount from '../atoms/VoteCount';

export default class AllQuestions extends Component {
  render() {
    return (
      <div
        className="uk-child-width-1-2@s gap-grid-collapse"
        uk-grid="masonry: true"
      >
        {this.props.questions.map(question => (
          <Link
            to={`/Questions/${question._id}`}
            key={question._id}
            params={{ id: question._id }}
          >
            <div className="uk-card uk-card-small uk-card-default uk-card-body uk-card-hover">
              <p className="uk-text-lead uk-text-primary">
                {question.title}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                {question.author}
                <br />
                <time dateTime={question.date}>{question.date}</time>
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
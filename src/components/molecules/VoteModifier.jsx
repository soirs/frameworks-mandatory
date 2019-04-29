import React, { Component } from 'react';
import VoteCount from '../atoms/VoteCount';

class VoteModifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.votes,
    };

    this.onDownvote = this.onDownvote.bind(this);
    this.onUpvote = this.onUpvote.bind(this);

  }
  onDownvote(e) {
    e.preventDefault();
    this.VoteAction(-1);

    // this.setState({ votes: event.target.value });
  }
  onUpvote(e) {
    e.preventDefault();

    this.VoteAction(1);

    // this.setState({ votes: event.target.value });
  }

  VoteAction(value) {
    const URL = process.env.REACT_APP_API_ANSWERS;

    let body = {
      answer_id: this.props.id,
      value: value,
      votes: this.props.votes + value,
    };
    fetch(`${URL}${this.props.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .then(vote => {
        console.log(`Before: ${this.props.votes}`);
        console.log(`Now: ${this.props.votes + value}`);
      });
  }

  vote = (e) =>{
    e.preventDefault();
    this.VoteAction(1);
  };

  render() {
    return (
      <div className="uk-text-center">
        <button onClick={this.onDownvote} value="-1" className="uk-button left uk-button-text">
          DOWNVOTE
        </button>
        {'  '}
        <VoteCount>{this.props.votes}</VoteCount>
        {'  '}
        <button onClick={this.vote} className="uk-button uk-button-text">
          UPVOTE
        </button>
      </div>
    );
  }
}

export default VoteModifier;

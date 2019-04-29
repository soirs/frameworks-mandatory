import React, { Component } from 'react';
import VoteCount from '../atoms/VoteCount';

class VoteModifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.votes,
    };
  }

  VoteAction(value) {
    const URL = 'http://localhost:8080';
    

    let body = {
      answer_id: this.props.id,
      value: value,
      votes: this.props.votes + value,
    };
    fetch(`/api/answers/${this.props.id}`, {
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
        console.log(`After: ${this.props.votes + value}`);
        console.log(vote);
      });
  }

  vote = e => {
    e.preventDefault();
    this.VoteAction(1);
  };

  render() {
    return (
      <div>
        <button onClick={this.vote} className="uk-button uk-button-text">
          UPVOTE
        </button>
        {'  '}
        <VoteCount>{this.props.votes}</VoteCount>

      </div>
    );
  }
}

export default VoteModifier;

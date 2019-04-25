import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
    this.isChecked = this.isChecked.bind(this);
  }

  isChecked(event) {
    this.setState({ isChecked: event.target.value, });
  }

  render() {
    const { isChecked } = this.props;
    return (
      <div>
        <label className="uk-form-label" htmlFor="isChecked">
          Is this page FrankOverflow?
        </label>
        <input
          id="isChecked"
          onChange={this.isChecked}
          value={isChecked}
          className="uk-checkbox"
          type="checkbox"
        />
      </div>
    );
  }
}

export default Checkbox;
// https://codepen.io/voidale/pen/EWPGLb
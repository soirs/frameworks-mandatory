import React, { Component } from 'react';
import Fullpage from '../template/Fullpage';

class Publish extends Component {
  render() {
    return (
      <div>
        <Fullpage>
          <h1>Publish</h1>

          <div>
            <form className="uk-form-stacked">
              {/* NAME */}
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-name">
                  Please enter your name
                </label>

                <div className="uk-form-controls">
                  <input
                    required
                    className="uk-input"
                    id="form-name"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <br />
                
                {/* TEXTAREA */}
                <label className="uk-form-label" htmlFor="form-textarea">
                  Please enter your question
                </label>

                <div className="uk-form-controls">
                  <textarea
                    required
                    className="uk-textarea"
                    id="form-textarea"
                    type="text-area"
                    placeholder="Enter your question"
                  />
                </div>
              </div>
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Is this page FrankOverflow?
              </label>
              <input className="uk-checkbox" type="checkbox" />
              <br />
              <br />
              <button className="uk-button uk-button-primary uk-align-right" >Submit</button>
            </form>
          </div>
        </Fullpage>
      </div>
    );
  }
}

export default Publish;

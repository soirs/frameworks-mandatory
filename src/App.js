import React, { Component } from 'react';
import Routes from './Routes';

import './css/document.css';

class App extends Component {
  API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);

    this.state = {};

    // this.getData = this.getData.bind(this);
  }

  componentDidMount() {}

  getData() {
    fetch(`${this.API_URL}/hello`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data.msg,
        });
      })
      .catch(error => {
        console.error('Error when fetching: ', error);
      });
  }

  render() {
    return <Routes />;
  }
}

export default App;

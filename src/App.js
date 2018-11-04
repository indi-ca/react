import React, { Component } from 'react';
import axios from 'axios'
import './App.css';


class Fragment extends React.Component {
  render() {
    return (
      <div className="Fragment">
         <div>{this.props.value.subject}</div>
         <div>{this.props.value.body}</div>
      </div>
    );
  }
}


// Check if value is used

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      fragment: {
        'subject': null,
        'body': null
      },
      version: null
    };

    axios.get('http://localhost:48538/reinforce61')
    .then((response) => {
      console.log(response.data);
      this.setState({fragment: response.data.fragment});
    })
    .catch((e) => 
    {
      console.error(e);
    });
  }


  renderFragment() {
    return (
      <Fragment
        value={this.state.fragment}
      />);
  }

  render() {
    return (
      <div className="Container">
        {this.renderFragment()}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Container />
    );
  }
}



export default App;

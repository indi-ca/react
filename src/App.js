import React, { Component } from 'react';
import axios from 'axios'
// import logo from './logo.svg';
import './App.css';


class Fragment extends React.Component {
  render() {
    return (
      <div className="Fragment">
        <div>Title {this.props.value}</div>
        <div>Description</div>
        <div>Empty space</div>
        <div>Examples</div>
        <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      </div>
    );
  }
}

class SpanishFragment extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="SpanishFragment">
        <div>{this.props.value.definition}</div>
        <div>{this.props.value.interpretation}</div>
        <div>Examples</div>
        <div>{this.props.value.en}</div>
        <div>{this.props.value.es}</div>
      </div>
    );
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      spanish: {
        'definition': null,
        'interpretation': null,
        'en': null,
        'es': null
      },
      version: null,
      fragments: Array(3).fill(1),
    };
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const fragments = this.state.fragments.slice();
    fragments[i] = '3';
    this.setState({ fragments: fragments });
  }

  handleRefreshClick () {
    axios.get('http://localhost:48538/reinforce61')
    .then((response) => {
      console.log(response.data);
      this.setState({version: response.data.version});
      this.setState({spanish: response.data.spanish});
    })
    .catch((e) => 
    {
      console.error(e);
    });
  }

  renderFragment(i) {
    return (
      <Fragment
        value={this.state.fragments[i]}
        onClick={() => this.handleClick(i)}
      />);
  }

  renderSpanishFragment() {
    return (
      <SpanishFragment
        value={this.state.spanish}
      />);
  }

  render() {
    return (
      <div className="Container">
        <button className="refresh" onClick={() => this.setState({ value: 'Refreshing' })}>
          Refresh button: {this.state.value}
        </button>
        <button className='button' onClick={this.handleRefreshClick}>
          Load Fragments
        </button>
        {this.renderSpanishFragment()}
        {this.renderFragment(0)}
        {this.renderFragment(1)}
        {this.renderFragment(2)}
        <div>Version: {this.state.version}</div>
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

import React, { Component } from 'react';
import logo from './logo.svg';
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

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      fragments: Array(3).fill(1),
    };
  }

  handleClick(i) {
    const fragments = this.state.fragments.slice();
    fragments[i] = '3';
    this.setState({fragments: fragments});
  }

  renderFragment(i) {
    return (
      <Fragment
        value={this.state.fragments[i]}
        onClick={() => this.handleClick(i)}
      />);
  }

  render() {
    return (
      <div className="Container">
        <button className="refresh" onClick={() => this.setState({ value: 'Refreshing' })}>
          {this.state.value}
        </button>
        {this.renderFragment(0)}
        {this.renderFragment(1)}
        {this.renderFragment(2)}
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

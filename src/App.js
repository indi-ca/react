import React, { Component } from 'react';
import axios from 'axios'
import './App.css';


class ChineseFragment extends React.Component {
  render() {
    return (
      <div className="ChineseFragment">
        <div className="symbol">{this.props.value.zhWord}</div>
        <div>{this.props.value.zhInterpretation.split('\n').map((item, key) => {
          return <span key={key}>{item}<br /></span>
        })}</div>
      </div>
    );
  }
}

class ExampleFragment extends React.Component {
  render() {
    return (
      <div className="ExampleFragment">
        <div className="symbol">{this.props.value.definition}</div>
        <div>{this.props.value.interpretation.split('\n').map((item, key) => {
          return <span key={key}>{item}<br /></span>
        })}</div>
        {this.props.value.extrano != "" &&
          <div className="translations">
            <div>{this.props.value.extrano}</div>
            <div className="local">{this.props.value.local}</div>
          </div>
        }
      </div>
    );
  }
}

class FreeFragment extends React.Component {
  render() {
    return (
      <div className="FreeFragment">
        <div>{this.props.value.subject}</div>
        <div>{this.props.value.body.split('\n').map((item, key) => {
          return <span key={key}>{item}<br /></span>
        })}</div>
      </div>
    );
  }
}


class Container extends React.Component {
  constructor(props) {
    super(props);
    var empty = {
      'definition': "",
      'interpretation': "",
      'local': "",
      'extrano': ""     
    }
    this.state = {
      chain: empty,
      french: empty,
      german: empty,
      khmer: empty,
      lao: empty,
      math: empty,
      phrase: empty,
      singhalese: empty,
      spanish: empty,
      thai: empty,
      vietnamese: empty,
      chinese: {
        'zhWord': "",
        'zhInterpretation': ""
      },
      fragment: {
        'subject': "",
        'body': ""
      },
      version: ""
    };

    axios.get('http://localhost:48538/reinforce61')
      .then((response) => {
        console.log(response.data);
        this.setState({ chain: response.data.chain });
        this.setState({ french: response.data.french });
        this.setState({ german: response.data.german });
        this.setState({ khmer: response.data.khmer });
        this.setState({ lao: response.data.lao });
        this.setState({ math: response.data.math });
        this.setState({ phrase: response.data.phrase });
        this.setState({ singhalese: response.data.singhalese });
        this.setState({ spanish: response.data.spanish });
        this.setState({ thai: response.data.thai });
        this.setState({ vietnamese: response.data.vietnamese });
        this.setState({ chinese: response.data.chinese });
        this.setState({ fragment: response.data.fragment });
        this.setState({ version: response.data.version });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderChineseFragment() {
    return (
      <ChineseFragment
        value={this.state.chinese}
      />);
  }

  renderExampleFragment(child){
    return (
      <ExampleFragment
        value={this.state[child]}
      />);
  }

  renderFreeFragment() {
    return (
      <FreeFragment
        value={this.state.fragment}
      />);
  }

  render() {
    return (
      <div className="Container">
        {this.renderExampleFragment('spanish')}
        {this.renderExampleFragment('phrase')}
        {this.renderExampleFragment('thai')}
        {this.renderChineseFragment()}
        {this.renderExampleFragment('math')}
        {this.renderFreeFragment()}
        {this.renderExampleFragment('vietnamese')}
        {this.renderExampleFragment('chain')}
        {this.renderExampleFragment('french')}
        {this.renderExampleFragment('german')}
        {this.renderExampleFragment('khmer')}
        {this.renderExampleFragment('lao')}
        {this.renderExampleFragment('singhalese')}
        <div className="version">Version {this.state.version}</div>
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

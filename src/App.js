import React, { Component } from 'react';
import axios from 'axios'
import './App.css';


class SpanishFragment extends React.Component {
  render() {
    return (
      <div className="SpanishFragment">
        <div className="subject">{this.props.value.definition}</div>
        <div>{this.props.value.interpretation}</div>
        <div className="translations">
          <div>{this.props.value.es}</div>
          <div className="local">{this.props.value.en}</div>
        </div>
      </div>
    );
  }
}

class ChineseFragment extends React.Component {
  render() {
    return (
      <div className="ChineseFragment">
        <div className="symbol">{this.props.value.zhWord}</div>
        <div>{this.props.value.zhInterpretation}</div>
      </div>
    );
  }
}

class ThaiFragment extends React.Component {
  render() {
    return (
      <div className="ThaiFragment">
        <div className="symbol">{this.props.value.thaiWord}</div>
        <div>{this.props.value.thaiInterpretation}</div>
      </div>
    );
  }
}

class Fragment extends React.Component {
  render() {
    return (
      <div className="Fragment">
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
    this.state = {
      spanish: {
        'definition': "",
        'interpretation': "",
        'en': "",
        'es': ""
      },
      chinese: {
        'zhWord': "",
        'zhInterpretation': ""
      },
      thai: {
        'thaiWord': "",
        'thaiIntepretation': "",
        'thaiTh': "",
        'thaiEn': ""
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
        this.setState({ spanish: response.data.spanish });
        this.setState({ chinese: response.data.chinese });
        this.setState({ thai: response.data.thai });
        this.setState({ fragment: response.data.fragment });
        this.setState({ version: response.data.version });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderSpanishFragment() {
    return (
      <SpanishFragment
        value={this.state.spanish}
      />);
  }

  renderChineseFragment() {
    return (
      <ChineseFragment
        value={this.state.chinese}
      />);
  }

  renderThaiFragment() {
    return (
      <ThaiFragment
        value={this.state.thai}
      />);
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
        {this.renderSpanishFragment()}
        {this.renderChineseFragment()}
        {this.renderThaiFragment()}
        {this.renderFragment()}
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

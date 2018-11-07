import React, { Component } from 'react';
import axios from 'axios'
import './App.css';


class SpanishFragment extends React.Component {
  render() {
    return (
      <div className="SpanishFragment">
        <div className="subject">{this.props.value.definition}</div>
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

class ThaiFragment extends React.Component {
  render() {
    return (
      <div className="ThaiFragment">
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
        'local': "",
        'extrano': ""
      },
      chinese: {
        'zhWord': "",
        'zhInterpretation': ""
      },
      thai: {
        'definition': "",
        'interpretation': "",
        'local': "",
        'extrano': ""
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

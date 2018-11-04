import React, { Component } from 'react';
import axios from 'axios'
import './App.css';


class SpanishFragment extends React.Component {
  render() {
    return (
      <div className="SpanishFragment">
        <div>{this.props.value.definition}</div>
        <div>{this.props.value.interpretation}</div>
	    <div>
	    This is the spacer
	    </div>
        <div>{this.props.value.en}</div>
        <div>{this.props.value.es}</div>
      </div>
    );
  }
}

class ChineseFragment extends React.Component {
  render() {
    return (
      <div className="ChineseFragment">
        <div>{this.props.value.zhWord}</div>
        <div>{this.props.value.zhInterpretation}</div>
      </div>
    );
  }
}

class ThaiFragment extends React.Component {
  render() {
    return (
      <div className="ThaiFragment">
        <div>{this.props.value.thaiWord}</div>
        <div>{this.props.value.thaiInterpretation}</div>
        <div>{this.props.value.thaiTh}</div>
        <div>{this.props.value.thaiEn}</div>
      </div>
    );
  }
}

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
      spanish: {
        'definition': null,
        'interpretation': null,
        'en': null,
        'es': null
      },
      chinese: {
        'zhWord': null,
        'zhInterpretation': null
      },
      thai: {
        'thaiWord': null,
        'thaiIntepretation': null,
        'thaiTh': null,
        'thaiEn': null
      },
      fragment: {
        'subject': null,
        'body': null
      },
      version: null
    };

    axios.get('http://localhost:48538/reinforce61')
    .then((response) => {
      console.log(response.data);
      this.setState({version: response.data.version});
      this.setState({spanish: response.data.spanish});
      this.setState({chinese: response.data.chinese});
      this.setState({thai: response.data.thai});
      this.setState({fragment: response.data.fragment});
    })
    .catch((e) => 
    {
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

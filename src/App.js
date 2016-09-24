import React, { Component } from 'react';
import { PunchCardManager } from './js/punchCardManager';

import './css/App.css';

class App extends Component {
  deck: null;

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      result: ''
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onClick = this.onClick.bind(this);

    // Initialize our deck.
    this.deck = PunchCardManager.setup();
  };

  onClick(e) {
    if (this.state.text) {
      this.setState({ result: null });

      var card = PunchCardManager.encode(this.state.text, this.deck);

      // Change class after delay, to allow resetting opacity (and fade effect).
      setTimeout(function(me) { me.setState({ result: card }); }, 10, this);
    }

    e.preventDefault();
  };

  onTextChange(e) {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div id="div-root" class="img-responsive">
          <form id="form">
            <div className="form-group">
              <label htmlFor="text">Text</label>
              <input type="text" className={'form-control ' + (this.state.text ? '' : 'validation-required')} id="text" placeholder="Enter some text to encode" value={ this.state.text } onChange={this.onTextChange} required />
            </div>
            <button type="submit" className="btn btn-primary rainbow" onClick={ this.onClick }>Create Punch Card</button>
          </form>
          <div id="output" className={'highlight ' + (this.state.result ? 'visible' : '')}>
          <h2>Your Punch Card</h2>
          <pre>{ this.state.result }</pre>
          </div>
        </div>
    );
  }
}

export default App;

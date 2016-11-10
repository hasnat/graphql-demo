import React, { Component, PropTypes } from 'react';
import { presenter } from 'adrenaline';
import OS from './OS.jsx'
class Browser extends Component {
  static propTypes = {
    browser: PropTypes.object.isRequired,
  }

  render() {
    const { browser } = this.props;

    return (
      <div style={style.container}>
        <div>
          <span>{browser.name}</span>
          (visits:{browser.traffic.visits})
        </div>
        {browser.supportedOS.map((os, index) => <OS key={index} os={os} browser={browser}/>)}
      </div>
    );
  }
}

export default presenter({
  fragments: {
    browser: `
      fragment on Browser {
        name
        supportedOS {
          ${OS.getFragment('os')}
        }
        traffic {
          visits
        }
      }
    `,
  },
})(Browser);

var style = {
  container: {
    border: '1px solid red',
    display: 'inline-block',
    width: '250px'
  }
}
/* @flow */

import React, { Component, PropTypes } from 'react';
import { container } from 'adrenaline';

import Loader from './Loader';
import Browser from './Browser';

class BrowsersList extends Component {
  static propTypes = {
    browsers: PropTypes.array,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const { browsers, isFetching } = this.props;

    if (isFetching) {
      return <Loader />;
    }

    return (
      <div>
        {browsers.map((browser, index) => <Browser key={index} browser={browser}/>)}
      </div>
    );
  }
}

export default container({
  query: `
    query {
      browsers {
        ${Browser.getFragment('browser')}
      }
    }
  `,
})(BrowsersList);

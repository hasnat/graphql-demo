import React, { Component, PropTypes } from 'react';
import { presenter } from 'adrenaline';

class OS extends Component {
  static propTypes = {
    os: PropTypes.object.isRequired,
  }

  render() {
    const { os } = this.props;

    return (
      <div style={style.container}>
        <h6>{os.name}</h6>
        {os.traffic.visits}
      </div>
    );
  }
}

export default presenter({
  fragments: {
    os: `
      fragment on OS {
        name
        traffic {
          visits
        }
      }
    `,
  },
})(OS);

var style = {
  container: {
    border: '1px solid blue',
    display: 'inline-block',
    width: '50px',
    fontSize: '12px'
  }
}
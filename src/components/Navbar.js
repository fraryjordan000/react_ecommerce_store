import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  getStyle = () => {
    return {
      'width': '100%',
      'height': '50px',
      'backgroundColor': '#bca'
    }
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>
    )
  }
}

export default Navbar;
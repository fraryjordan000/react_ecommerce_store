import React, { Component } from 'react'
import ApiList from '../containers/Api-list';

class Home extends Component {
  product_list_styles = () => {
    return {
      
    }
  }

  render() {
    return (
      <div style={this.product_list_styles()}>
        <ApiList />
      </div>
    )
  }
}

export default Home;
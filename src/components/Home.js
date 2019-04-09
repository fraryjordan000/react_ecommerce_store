import React, { Component } from 'react'

class Home extends Component {
  product_list_styles = () => {
    return {
      
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div style={this.product_list_styles()}>
        {this.products}
      </div>
    )
  }
}

export default Home;
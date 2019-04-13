import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import axios from 'axios';
import { updateProducts } from '../actions';

class Cart extends Component {

  state = {
    productsXML: []
  }

  reRender = () => {
    this.createProducts(this.props.products);
  }

  createProducts = (arr) => {
    let rtn = [];
    // console.log('InCart, Creating Products: ', arr);
    for(let product of arr) {
      if(!product.inCart) continue;
      rtn.push((
          <Product key={product.id} product={product} reRender={this.reRender}/>
      ));
    }
    this.setState({productsXML: rtn});
  }

  componentDidMount() {
    if(this.props.products.length === 0) {
      axios.get('https://my-json-server.typicode.com/tdmichaelis/typicode/products').then(res => {
          for(let i in res.data) {
              res.data[i].inCart = false;
              res.data[i].visible = true;
          }
          console.log('InCart:', res.data);
          this.props.updateProducts(res.data);
          this.createProducts(res.data);
      });
    } else {
      this.createProducts(this.props.products);
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.productsXML}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateProducts: arr => {
        dispatch(updateProducts(arr));
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
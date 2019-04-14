import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import axios from 'axios';
import { updateProducts, clearCart, addTicket } from '../actions';

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

  purchase = () => {
    let d = new Date();
    let ticket = {
      date: "",
      items: "",
      total: 0
    }
    for(let i in this.props.products) {
      if(this.props.products[i].inCart) {
        ticket.items += "["+this.props.products[i].title+"], ";
        ticket.total += this.props.products[i].price;
      }
    }
    ticket.items = ticket.items.substring(0,ticket.items.length-2);
    ticket.date = `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
    this.props.addTicket(ticket);
    this.props.clearCart();
    this.setState({productsXML: []});
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
      <React.Fragment>
        <div className="checkout">
          <button onClick={() => this.purchase()}>Purchase</button>
        </div>
        <div className="container">
          {this.state.productsXML.length > 0 ? this.state.productsXML : (<div style={{gridColumn: '2/3'}}>Go buy something!</div>)}
        </div>
      </React.Fragment>
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
      },
      clearCart: () => {
        dispatch(clearCart());
      },
      addTicket: ticket => {
        dispatch(addTicket(ticket));
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
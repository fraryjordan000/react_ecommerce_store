import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToCart, removeFromCart } from '../actions/index';


class Details extends Component {

  state = {
    product: (() => {
      for(let prod of this.props.products) {
        if(prod.id === this.props.active) {
          return prod;
        }
      }
      return {error: true};
    })(),
    inCartText: 'Remove From Cart',
    outOfCartText: 'Add To Cart',
    activeText: ''
  }

  textLogic = () => {
    if(this.state.product.inCart) {
        this.setState({activeText: this.state.inCartText});
    } else {
        this.setState({activeText: this.state.outOfCartText});
    }
  }

  clicked = (id) => {
      if(this.state.product.inCart) {
          this.props.removeFromCart(id);
      } else {
          this.props.addToCart(id);
      }
      this.textLogic();
  }

  componentDidMount() {
    this.textLogic();
  }

  render() {
    let prod = this.state.product;
    if(prod.error) return (<div>ERROR: No product specified</div>);
    return (
      <React.Fragment>
        <div className="detailsContainer">
          <img src={prod.img} alt="product" />
          <div className="details">
            <h1>{prod.title}</h1>
            <h2>Rating: {prod.rating}/5</h2>
            <p>{prod.description}</p>
            <div>
              <h3 className="price">{prod.price}</h3>
              <button onClick={() => this.clicked(prod.id)} className="cartButton">{this.state.activeText}</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
      products: state.products,
      active: state.active
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id), () => {});
    },
    removeFromCart: id => {
        dispatch(removeFromCart(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
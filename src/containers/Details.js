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
    if(this.state.product.error) return (<div>ERROR: No product specified</div>);
    return (
      <React.Fragment>
        <div className="detailsContainer">
          <img src={this.state.product.img} alt="product" />
          <div className="details">
            <h1>{this.state.product.title}</h1>
            <p>{this.state.product.description}</p>
            <div>
              <h3 className="price">{this.state.product.price}</h3>
              <button onClick={() => this.clicked(this.state.product.id)} className="cartButton">{this.state.activeText}</button>
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
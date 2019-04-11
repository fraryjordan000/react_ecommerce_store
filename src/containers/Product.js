import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addToCart } from '../actions/index';

class Product extends Component {

    state = {
        inCart: false,
        inCartText: 'In Cart',
        activeText: 'Add To Cart'
    }

    updateTextAndCart = product => {
        if(this.state.inCart) return;
        this.setState({inCart: true, activeText: this.state.inCartText});
        this.props.addToCart(product);
    }

    getStyles = () => {
        return {
            
        }
    }

    render() {
        let prod = this.props.product;
        return (
        <div key={prod.id}>
            <h3>{prod.title}</h3>
            <p>{prod.description}</p>
            <button onClick={() => this.updateTextAndCart(prod)} disabled={this.state.inCart}>{this.state.activeText}</button>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: product => {
            dispatch(addToCart(product));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
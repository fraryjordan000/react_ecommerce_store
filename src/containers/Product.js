import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/index';

class Product extends Component {

    state = {
        inCart: this.props.product.inCart,
        inCartText: 'Remove From Cart',
        outOfCartText: 'Add To Cart',
        activeText: ''
    }

    textLogic = () => {
        if(this.props.product.inCart) {
            this.setState({activeText: this.state.inCartText});
        } else {
            this.setState({activeText: this.state.outOfCartText});
        }
    }

    clicked = (id) => {
        if(this.props.product.inCart) {
            this.props.removeFromCart(id);
        } else {
            this.props.addToCart(id);
        }
        if(this.props.reRender !== undefined) {
            this.props.reRender();
            return;
        }
        this.textLogic();
    }

    componentDidMount() {
        this.textLogic();
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
            <button onClick={() => this.clicked(prod.id)}>{this.state.activeText}</button>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        api: state.api
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: id => {
            dispatch(addToCart(id));
        },
        removeFromCart: id => {
            dispatch(removeFromCart(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
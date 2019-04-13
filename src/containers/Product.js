import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, updateActive } from '../actions/index';

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

    render() {
        let prod = this.props.product;
        return (
        <div key={prod.id} className="product">
            <img src={prod.img} alt="Item"/>
            <Link to="/details" onClick={() => this.props.updateActive(prod.id)}>{prod.title}</Link>
            <div>
                <span className="price">${prod.price}</span>
                <button onClick={() => this.clicked(prod.id)} className="cartButton">{this.state.activeText}</button>
            </div>
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
        },
        updateActive: index => {
            dispatch(updateActive(index));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
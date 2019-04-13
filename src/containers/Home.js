import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProducts, updateCategories, filterProducts } from '../actions/index';
import axios from 'axios';

import Product from './Product';

class ProductsList extends Component {

    state = {
        productsXML: []
    }

    createProducts = (arr) => {
        let rtn = [];
        // console.log('InHome, Creating Products:', arr);
        for(let product of arr) {
            if(!product.visible) continue;
            rtn.push((
                <Product key={product.id} product={product}/>
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
                console.log('InProductsList:', res.data);
                this.props.updateProducts(res.data);
                this.createProducts(res.data);
            });
        } else {
            this.createProducts(this.props.products);
        }
        if(this.props.categories.length === 0) {
            axios.get('https://my-json-server.typicode.com/tdmichaelis/typicode/categories').then(res => {
                console.log('InProductsList:', res.data);
                this.props.updateCategories(res.data);
            });
        }
    }

    render() {
        return (
            <div className="container">
                {this.state.productsXML}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProducts: arr => {
            dispatch(updateProducts(arr));
        },
        updateCategories: arr => {
            dispatch(updateCategories(arr));
        },
        filterProducts: str => {
            dispatch(filterProducts(str));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProducts, updateCategories, filterProducts, triggerChange,  } from '../actions/index';
import axios from 'axios';

import Product from './Product';

class ProductsList extends Component {

    state = {
        productsXML: [],
        categoriesXML: []
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

    createOptions = (arr) => {
        let rtn = [];
        let categories = arr !== undefined ? arr : this.props.categories;
        if(this.props.filter === 'none') {
            rtn.push((<option defaultValue key={Math.random()} value="none">None</option>));
        } else {
            rtn.push((<option key={Math.random()} value="none">None</option>));
        }
        for(let category of categories) {
            if(category === this.props.filter) {
                rtn.push((
                    <option defaultValue value={category} key={Math.random()}>{category}</option>
                ));
                continue;
            }
            rtn.push((
                <option value={category} key={Math.random()}>{category}</option>
            ));
        }
        this.setState({categoriesXML: rtn});
    }

    selectChanged = (e) => {
        let category = e.target.value;
        this.props.filterProducts(category);
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
                this.createOptions(res.data);
            });
        } else {
            this.createOptions();
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.change !== this.props.change) {
            this.createProducts(this.props.products);
        }
    }

    render() {
        return (
            <React.Fragment>
                <form className="sortBox">
                    <span>Sort Category:</span>
                    <select onChange={this.selectChanged} value={this.props.filter}>
                        {this.state.categoriesXML}
                    </select>
                </form>
                <div className="container">
                    {this.state.productsXML}
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        categories: state.categories,
        change: state.change,
        filter: state.filter
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
            dispatch(triggerChange());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
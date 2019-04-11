import React, { Component } from 'react'
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateAPI } from '../actions/index';
import axios from 'axios';

import Product from './Product';

class ApiList extends Component {

    state = {
        products: []
    }

    createProducts = (arr) => {
        let rtn = [];
        for(let product of arr) {
            rtn.push((
                <Product key={product.id} product={product}/>
            ));
        }
        this.setState({products: rtn});
    }

    componentDidMount() {
        if(this.props.api.length === 0) {
            axios.get('https://my-json-server.typicode.com/tdmichaelis/typicode/products').then(res => {
                this.props.updateAPI(res.data);
                this.createProducts(res.data);
            });
        } else {
            this.createProducts(this.props.api);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.products}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        api: state.api
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAPI: arr => {
            dispatch(updateAPI(arr));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiList);
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Orders extends Component {

    createOrderTickets = () => {
        let ticketList = [];
        for(let ticket of this.props.tickets) {
            ticketList.push((
                <div className="ticket" key={Math.random() * ticket.total}>
                    <div><span>${ticket.total}</span><h3>{ticket.date}</h3></div>
                    <p>{ticket.items}</p>
                </div>
            ));
        }
        return (
            <div className="ticketsContainer">
                {ticketList.length > 0 ? ticketList : (<div style={{marginTop: '10px'}}>Go buy something!</div>)}
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.createOrderTickets()}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        tickets: state.tickets
    }
}

export default connect(mapStateToProps)(Orders);
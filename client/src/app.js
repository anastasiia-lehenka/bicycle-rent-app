import React, { Component, Fragment } from 'react';
import { BicycleList } from './components/bicycle-list';
import { AddForm } from './components/add-form';
import './app.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            bicycles: []
        };
    }

    componentDidMount() {
        this.getBicycles();
    }

    getBicycles = () => {
        fetch('/api/bicycles')
            .then(res => res.json())
            .then(bicycles => this.setState({ bicycles }))
            .catch(err => console.log(err));
    };

    countTotalPrice = () => {
        const { bicycles } = this.state;

        return bicycles.reduce((sum, currentItem) => currentItem.rented ? currentItem.price + sum : sum, 0).toFixed(2);
    };

    addNewItem = item => {
        const { bicycles } = this.state;

        item.rented = false;
        fetch('/api/bicycles', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(newItem => this.setState({ bicycles: [...bicycles, newItem] }))
            .catch(err => console.log(err));
    };

    deleteItem = id => {
        const { bicycles } = this.state;

        fetch(`/api/bicycles/${id}`, { method: 'DELETE' })
            .then(() => this.setState({ bicycles: bicycles.filter(item => item._id !== id) }))
            .catch(err => console.log(err));
    };

    toggleRent = (item, isRented) => {
        const { bicycles } = this.state;
        item.rented = isRented;

        fetch(`/api/bicycles/${item._id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({rented: item.rented})
        })
            .then(res => res.json())
            .then(newItem => this.setState({ bicycles: [...bicycles.filter(item => item._id !== newItem._id), newItem] }))
            .catch(err => console.log(err));
    };

    render() {
        const { bicycles } = this.state;
        const rentedBicycles = bicycles.filter(item => item.rented);
        const availableBicycles = bicycles.filter(item => !item.rented);

        return (
            <Fragment>
                <h1 className="main-heading">Awesome Bike Rental</h1>
                <h2 className="sub-heading">
                    <span role="img" aria-label="dollar">&#x1F911;</span>
                    Create new rent
                </h2>
                <AddForm onAddNewRent = { this.addNewItem }/>
                <h2 className="sub-heading">
                    <span role="img" aria-label="star">&#x1F929;</span>
                    Your rent (Total: ${ this.countTotalPrice() })
                </h2>
                <BicycleList
                    bicycleList={ rentedBicycles }
                    onToggleRent = { this.toggleRent }
                />
                <h2 className="sub-heading">
                    <span className="fa fa-bicycle"></span>
                    Available bicycles ({ availableBicycles.length })
                </h2>
                <BicycleList
                    bicycleList={ availableBicycles }
                    onDeleteItem={ this.deleteItem }
                    onToggleRent = { this.toggleRent }
                />
            </Fragment>
        );
    }
}

export default App;

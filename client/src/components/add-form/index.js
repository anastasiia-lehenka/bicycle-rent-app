import React, { Component } from 'react';
import './style.css';

export class AddForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            name: '',
            type: '',
            price: ''
        };
        this.state = this.initialState;
    }

    onChange = e => {
        let newState = e.target.name === 'price'
            ? { price: parseFloat(e.target.value) || '' }
            : { [e.target.name]: e.target.value };

        this.setState(newState);
    };

    onSubmitForm = e => {
        e.preventDefault();

        this.props.onAddNewRent(this.state);

        this.setState(this.initialState);
    };

    render() {
        const {
            name,
            type,
            price
        } = this.state;

        return (
            <form className="add-form" onSubmit={ this.onSubmitForm }>
                <label className="label">
                    <span>Bike name</span>
                    <input
                        className="input input--name"
                        name="name"
                        type="dropdown"
                        placeholder="Ex. Canondale S6"
                        //maxLength="50"
                        minLength="3"
                        value={ name }
                        onChange={ this.onChange }
                        required>
                    </input>
                </label>
                <label className="label">
                    <span>Bike type</span>
                    <div className="select-container">
                        <select className="select input" name="type" onChange={ this.onChange } value={ type } required>
                            <option value="" hidden>Select type</option>
                            <option value="Mountain">Mountain</option>
                            <option value="Road">Road</option>
                            <option value="Child">Child</option>
                        </select>
                    </div>
                </label>
                <label className="label">
                    <span>Rent Price</span>
                    <input
                        className="input input--price"
                        type="number"
                        name="price"
                        placeholder="99.0"
                        min="0.1"
                        max="100000"
                        step="0.01"
                        value={ price }
                        onChange={ this.onChange }
                        required>
                    </input>
                </label>
                <button className="button button--submit" type="submit">Submit rent</button>
            </form>
        );
    }
}

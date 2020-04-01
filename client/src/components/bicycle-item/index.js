import React from 'react';
import './style.css';

export const BicycleItem = props => {
    const {
        bicycleItem,
        onDeleteItem,
        onToggleRent
    } = props;

    return (
        <li className="list-item">
            <p className="list-item__details">{ bicycleItem.name } / { bicycleItem.type } / ${ bicycleItem.price.toFixed(2) }</p>
            { bicycleItem.rented ?
                <button className="button button--cancel" onClick={ onToggleRent.bind(this, bicycleItem) }>Cancel rent</button>
                : <div className="buttons-section">
                    <button className="button button--rent" onClick={ onToggleRent.bind(this, bicycleItem) }>Rent</button>
                    <button className="button button--delete" onClick={ onDeleteItem.bind(this, bicycleItem._id) }>Delete</button>
                </div>
            }
        </li>
    );
};


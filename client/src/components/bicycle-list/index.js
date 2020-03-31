import React from 'react';
import './style.css';
import { BicycleItem } from "../bicycle-item";

export const BicycleList = props => {
    const {
        bicycleList,
        onDeleteItem,
        onToggleRent
    } = props;

    return (
        <ul className="list">
            { bicycleList.length === 0 &&
            <p className="warning">No items in the list</p>
            }
            { bicycleList.map(item =>
                    <BicycleItem
                        bicycleItem={ item }
                        key={ item.id }
                        onDeleteItem={ onDeleteItem }
                        onToggleRent={ onToggleRent }
                    />
                    )
            }
        </ul>
    );
};


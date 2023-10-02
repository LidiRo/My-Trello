import React from "react";
import './list.scss';
import { IList } from "../../../../common/interfaces/IList";
import { Card } from "../Card/Card";

export const List = (props : IList) => {
    return (
        <div className="list-container">
            <h2 className="list-title">{props.title}</h2>
            <ul className="cards">{props.cards?.map(el => <Card key={el.id} title={el.title} />)}</ul>
            <div className="add-card-button-container">
                <button type="button" className="add-card-button">+ Додати картку</button>
            </div>
            
        </div>);
}
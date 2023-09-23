import React from "react";
import '../list.scss';
import { IList } from "../../../../common/interfaces/IList";
import { Card } from "../Card/Card";

export const List = (props : IList) => {
    return (
        <>
            <h2>{props.title}</h2>
            <ul>{props.cards?.map(el => <Card key={el.id} title={el.title} />)}</ul>
            <button type="button">+ Додати картку</button>
        </>);
}
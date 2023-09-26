import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import './board.scss';
import { List } from "./components/List/List";


export const Board = () => {
    const [title] = useState("Моя тестова дошка");
    const [lists] = useState([
        {
            id: 1,
            title: "Плани",
            cards: [
                { id: 1, title: "помити кота" },
                { id: 2, title: "приготувати суп" },
                { id: 3, title: "сходити в магазин" }
            ]
        },
        {
            id: 2,
            title: "В процесі",
            cards: [
                { id: 4, title: "подивитися серіал" }
            ]
        },
        {
            id: 3,
            title: "Зроблено",
            cards: [
                { id: 5, title: "зробити домашку" },
                { id: 6, title: "погуляти з собакой" }
            ]
        }
    ]);
    let {board_id} = useParams();
    console.log("params.id = " + board_id);

    return (
        <div className="board-container">
            <div className="board-header">
                <button type="button" className="back-home-button">Додому</button>
                <h1 className="board-title">{title} {board_id}</h1>
            </div>
            <div className="lists-container">
                <div className="lists">
                    {lists.map((item) => (
                        <div key={item.id}><List key={item.id} title={item.title} cards={item.cards} /></div>
                    ))}
                </div>
                <div className="add-list-button-container">
                    <button type="button" className="add-list-button">+ Додати список</button>
                </div>
            </div>
        </div>
    );
}
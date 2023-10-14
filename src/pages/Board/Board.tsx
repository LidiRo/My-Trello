import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import './board.scss';
import { List } from "./components/List/List";
import { IList } from "../../common/interfaces/IList";
import getData from "../../common/requests/getData";

export const Board = () => {
    // const [title] = useState("Моя тестова дошка");
    const [lists, setLists] = useState<IList[]>([]);

    let { board_id } = useParams();

    useEffect(() => {
        getData(`/board/${board_id}`).then(data => data !== undefined ? setLists(data?.lists) : []);
    }, [])

    // console.log("lists = ",lists);

    return (
        <div className="board-container">
            <div className="board-header">
                <Link to={'/'}>
                    <button type="button" className="back-home-button">Додому</button>
                </Link>
                
                <h1 className="board-title">{board_id}</h1>
            </div>
            <div className="lists-container">
                <div className="lists">
                    {!lists || lists.map((list) => (
                        <div key={list.id}>
                            <List key={list.id} title={list.title} cards={list.cards} />
                        </div>
                    ))}
                </div>
                <div className="add-list-button-container">
                    <button type="button" className="add-list-button">+ Додати список</button>
                </div>
            </div>
        </div>
    );
}
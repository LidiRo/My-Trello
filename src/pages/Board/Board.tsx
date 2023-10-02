import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './board.scss';
import { List } from "./components/List/List";
import instance from "../../api/request";

interface IList{
    id: number;
    title: string;
}

export const Board = () => {
    const [title] = useState("Моя тестова дошка");

    // const [lists] = useState([
    //     {
    //         id: 1,
    //         title: "Плани",
    //         cards: [
    //             { id: 1, title: "помити кота" },
    //             { id: 2, title: "приготувати суп" },
    //             { id: 3, title: "сходити в магазин" }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         title: "В процесі",
    //         cards: [
    //             { id: 4, title: "подивитися серіал" }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         title: "Зроблено",
    //         cards: [
    //             { id: 5, title: "зробити домашку" },
    //             { id: 6, title: "погуляти з собакой" }
    //         ]
    //     }
    // ]);
    
    const [lists, setLists] = useState<IList[]>([]);
    const [error, setError] = useState('');
    
    let { board_id } = useParams();
    console.log("params.id = " + board_id);

    useEffect(() => {
        const fetchData = async () => {
            const { data } : any = await instance
                .get<IList[]>('lists')
                .catch(err => {
                    setError(err.message)
                }); 
            setLists(data);
        }
        fetchData();
    }, [])
    


    return (
        <div className="board-container">
            <div className="board-header">
                <button type="button" className="back-home-button">Додому</button>
                <h1 className="board-title">{title} {board_id}</h1>
            </div>
            <div className="lists-container">
                {error}
                <div className="lists">
                    {/* {lists.map((item) => (
                        <div key={item.id}><List key={item.id} title={item.title} cards={item.cards} /></div>
                    ))} */}
                    {lists.map((list) => (
                        <div key={list.id}><List key={list.id} title={list.title} /></div>
                    ))}
                </div>
                <div className="add-list-button-container">
                    <button type="button" className="add-list-button">+ Додати список</button>
                </div>
            </div>
        </div>
    );
}
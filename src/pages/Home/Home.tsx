import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./home.scss";
import { BoardHome } from "./components/Board/Board";

export const Home = () => {
    const [title] = useState("Мої дошки");
    const [boards] = useState([
        { id: 1, title: "покупки", custom: { background: "rgba(255, 176, 176, 0.5)", border: "2px solid rgba(255, 176, 176, 0.7)" } },
        { id: 2, title: "підготовка до весілля", custom: { background: "rgba(176, 255, 176, 0.5)", border: "2px solid rgba(176, 255, 176, 0.7)" } },
        { id: 3, title: "розробка інтернет-магазину", custom: { background: "rgba(176, 176, 255, 0.5)", border: "2px solid rgba(176, 176, 255, 0.7" } },
        { id: 4, title: "курс по просуванню у соцмережах", custom: { background: "rgba(176, 176, 176, 0.5)", border: "2px solid rgba(176, 176, 176, 0.7)" } }
    ]);

    return (
        <div className="home-container">
            <h1 className="home-title">{title}</h1>
            <div className="home-boards-container">
                <div className="home-boards">
                    {boards.map((item) => (
                        <Link to={`/board/:${item.id}`} key={item.id}><div  className="board-home-title" style={item.custom}><BoardHome key={item.id} title={item.title} background={item.custom.background} border={item.custom.border} /></div></Link>
                    ))}
                    <button type="button" className="add-home-board-button">+ Створити дошку</button>
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./home.scss";
import { BoardHome } from "./components/BoardHome/BoardHome";
import instance from "../../api/request";
import { Modal } from "./components/Modal/Modal";

interface IBoard {
    id: number;
    title: string;
    custom: any
}

export const Home = () => {
    const [title] = useState("Мої дошки");

    // const [boards] = useState([
    //     { id: 1, title: "покупки", custom: { background: "rgba(255, 176, 176, 0.5)", border: "2px solid rgba(255, 176, 176, 0.7)" } },
    //     { id: 2, title: "підготовка до весілля", custom: { background: "rgba(176, 255, 176, 0.5)", border: "2px solid rgba(176, 255, 176, 0.7)" } },
    //     { id: 3, title: "розробка інтернет-магазину", custom: { background: "rgba(176, 176, 255, 0.5)", border: "2px solid rgba(176, 176, 255, 0.7" } },
    //     { id: 4, title: "курс по просуванню у соцмережах", custom: { background: "rgba(176, 176, 176, 0.5)", border: "2px solid rgba(176, 176, 176, 0.7)" } }
    // ]);

    const [boards, setBoards] = useState<IBoard[]>([]);

    const [error, setError] = useState('');

    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);
    const onCreate = () => alert('Create Board');

    useEffect(() => {
        const fetchData = async () => {
            const { data }: any = await instance
                .get<IBoard[]>('boards')
                .catch(err => {
                    setError(err.message)
                });
            setBoards(data);
        }
        fetchData();
    }, [])

    function handleClick() {
        setModal(true);
    }

    return (
        <div className="home-container">
            <h1 className="home-title">{title}</h1>
            <div className="home-boards-container">
                {error}
                <div className="home-boards">
                    {boards.map((board) => (
                        <Link to={`/board/:${board.id}`} key={board.id}><div className="board-home-title" style={board.custom}><BoardHome key={board.id} title={board.title} background={board.custom.background} border={board.custom.border} /></div></Link>
                    ))}
                    <button type="button" className="add-home-board-button" onClick={handleClick}>+ Створити дошку</button>
                    <Modal
                        visible={isModal}
                        title="Створити дошку"
                        onClose={onClose}
                        onCreate={onCreate}/>
                </div>
            </div>
        </div>
    )
}
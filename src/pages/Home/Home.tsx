import { useEffect, useState } from "react";
import "./home.scss";
import { Link } from 'react-router-dom';
import { BoardHome } from "./components/BoardHome/BoardHome";
import { IBoard } from "../../common/interfaces/IBoard";
import { Modal } from "./components/Modal/Modal";
import getData from "../../common/requests/getData";
import postData from "../../common/requests/postData";
import deleteData from "../../common/requests/deleteData";

const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const Home = () => {
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);

    useEffect(() => {
        getData('/board').then(data => data !== undefined ? setBoards(data?.boards) : []);
    }, [])

    const addBoard = async (name: string) => {
        if (name !== "" && PATTERN.test(name)) {
            await postData(name);
        }
        getData('/board').then(data => data !== undefined ? setBoards(data?.boards) : []);
        setModal(false);
    }

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setModal(true);
    }

    const handleDelete = async (id : number | undefined) => {
        deleteData(id, boards).then(data => data !== undefined ? setBoards(data) : []);
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Мої дошки</h1>
            <div className="home-boards">
                {!boards || boards.map(board => (
                    <div key={board.id}>
                        <Link to={`/board/${board.id}`}>
                            <BoardHome
                                key={board.id}
                                title={board.title}
                            />
                        </Link>
                        <button type="button" onClick={() => handleDelete(board.id)}>Delete</button>
                    </div>
                ))}
                <button type="button" className="add-home-board-button" onClick={handleClick}>+ Створити дошку</button>
            </div>
            {isModal && <Modal visible={isModal} onClose={onClose} createBoard={addBoard} />}
        </div>
    )
}
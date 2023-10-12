import { useEffect, useState } from "react";
import "./home.scss";
import { Link } from 'react-router-dom';
import { BoardHome } from "./components/BoardHome/BoardHome";
import api from "../../api/request";
import instance from "../../api/request";
import { IBoard } from "../../common/interfaces/IBoard";
import { BoardsServerResponse } from "../../common/interfaces/BoardsServerResponse";

export const Home = () => {
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [inputValues, setInputValues] = useState('');
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const data: BoardsServerResponse = await instance.get('/board');
                setBoards(data?.boards)
            } catch (err: any) {
                console.log(`Error: ${err.message}`);
            }
        }
        fetchBoards();
    }, [])

    const pattern = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(pattern.test(inputValues))

        if (inputValues !== "" && pattern.test(inputValues)) {
            try {
                const board = { title: inputValues };
                await api.post(`/board`, board);
            } catch (err: any) {
                console.log(`Error: ${err.message}`);
            }
        }


        try {
            const data: BoardsServerResponse = await instance.get('/board');
            setBoards(data?.boards)
        } catch (err: any) {
            console.log(`Error: ${err.message}`);
        }
        setModal(false);
    }

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setModal(true);
    }

    const handleDelete = async (id: any) => {
        try {
            await api.delete(`/board/${id}`);
            const boardsList = boards.filter(board => board.id !== id);
            setBoards(boardsList);
        } catch (err: any) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Мої дошки</h1>
            <div className="home-boards">
                {!boards || boards.map(board => (
                    <div key={board.id}>
                        <Link to={`/board/${board.id}`} >
                            <BoardHome
                                key={board.id}
                                title={board.title + board.id}
                            />
                        </Link>
                        <button type="button" onClick={() => handleDelete(board.id)}>Delete</button>
                    </div>
                ))}
                <button type="button" className="add-home-board-button" onClick={handleClick}>+ Створити дошку</button>
            </div>
            {isModal &&
                <div className='modal' onClick={onClose}>
                    <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                        <div className='modal-header'>
                            <h3 className='modal-title'>Створити дошку</h3>
                            <span className='modal-close' onClick={onClose}>
                                &times;
                            </span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='modal-body'>
                                <label>
                                    <input type="text" className='modal-input' value={inputValues} onChange={e => setInputValues(e.target.value)} />
                                </label>
                                <button type="submit">Створити</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}
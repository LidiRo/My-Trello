import { useEffect, useState } from "react";
import "./home.scss";
import { Link } from 'react-router-dom';
import { BoardHome } from "./components/BoardHome/BoardHome";
import { IBoard } from "../../common/interfaces/IBoard";
import { Modal } from "./components/Modal/Modal";
import deleteData from "../../common/requests/deleteData";
import instance from "../../api/request";


const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const HomeCopy = () => {
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const board: { boards: [] } = await instance.get(`/board`);
                setBoards(board.boards);
            } catch (err: any) {
                console.log(`Error: ${err.message}`);
            }
        }
        fetchData();
    }, [])

    const addBoard = async (name: string) => {
        if (name !== "" && PATTERN.test(name)) {
            try {
                const board = { title: name };
                await instance.post(`/board`, board);
            } catch (err: any) {
                console.log(`Error: ${err.message}`);
            }
        }

        try {
            const board: { boards: [] } = await instance.get(`/board`);
            setBoards(board.boards);
        } catch (err: any) {
            console.log(`Error: ${err.message}`);
        }
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
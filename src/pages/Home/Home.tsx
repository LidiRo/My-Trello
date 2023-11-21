import { ReactElement, useEffect, useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { BoardHome } from "./components/BoardHome/BoardHome";
import { Modal } from "./components/Modal/Modal";
import IconDelete from "../../common/images/icon-delete-2.png"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IBoard } from "../../common/interfaces/IBoard";
import toast from "react-hot-toast";
import instance from "../../api/request";
import api from '../../api/request';


const PATTERN = new RegExp(/^[0-9a-zA-Zа-яА-ЯіІ\s\-_.]+$/i);

export const Home = (): ReactElement => {
    
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [isModal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const board: { boards: IBoard[] } = await instance.get('/board'); 
                if (board.boards !== undefined) {
                    setBoards(board.boards);
                }
            } catch (err: any) {
                toast.error(err.message);
            }
        }

        api.interceptors.request.use((config: any) => {
            setIsLoading(true);
            return config;
        });
        api.interceptors.response.use((response: any) => {
            setIsLoading(false);
            return response;
        });

        fetchData();
    }, [])

    const handleAdd = async (title: string) => {
        if (title !== "" && PATTERN.test(title)) {
            await instance.post('/board', { title: title});
        }
        const board: { boards: IBoard[] } = await instance.get('/board');
        if (board.boards !== undefined) {
            setBoards(board.boards);
        }
        setModal(false);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id !== undefined) {
            await instance.delete(`/board/${id}`);
            const board: { boards: IBoard[] } = await instance.get('/board');
            if (board.boards !== undefined) {
                setBoards(board.boards);
            }
        }
    }

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setModal(true);
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Мої дошки</h1>
            <div className="home-boards-section">
                {isLoading &&
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                <ul className="home-boards-section-list">
                    {boards &&
                        boards.map(board => (
                            <li className="home-board" key={board.id}>
                                <Link className="link" to={`/board/${board.id}`}>
                                    <div className="board-home-container">
                                        <BoardHome
                                            key={board.id}
                                            title={board.title}
                                            background={board.custom?.background}
                                        />
                                    </div>
                                    <span className="board-home-container-fade"></span>
                                </Link>
                                <div className="home-button-delete" onClick={() => handleDelete(board.id)}>
                                    <img src={IconDelete} alt="del" />
                                    <span className="tooltiptext" title="Натисніть, щоб видалити дошку">
                                        Натисніть, щоб видалити дошку
                                    </span>
                                </div>
                            </li>
                        ))}
                    <li className="add-home-board">
                        <button type="button" className="add-home-board-button" onClick={handleClick}>+ Створити дошку</button>
                    </li>
                </ul>
            </div>
            {isModal &&
                <Modal
                    visible={isModal}
                    onClose={() => setModal(false)}
                    createBoard={handleAdd}
                />
            }
        </div>
    )
}
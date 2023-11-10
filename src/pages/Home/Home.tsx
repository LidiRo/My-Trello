import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import "./home.scss";
import { fetchAllBoards, createBoard, deleteBoard } from "../../store/reducers/boardActions";
import { Link } from "react-router-dom";
import { BoardHome } from "./components/BoardHome/BoardHome";
import { Modal } from "./components/Modal/Modal";
import IconDelete from "../../images/icon-delete-2.png"


const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const Home = () => {

    const dispatch = useAppDispatch();
    const { boards, isLoading, error } = useAppSelector(state => state.boardReducer);
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);

    useEffect(() => {
        dispatch(fetchAllBoards());
    }, [dispatch])

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setModal(true);
    }

    const handleAdd = async (title: string) => {
        if (title !== "" && PATTERN.test(title)) {
            await dispatch(createBoard(title))
        }
        await dispatch(fetchAllBoards());
        setModal(false);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id !== undefined) {
            await dispatch(deleteBoard(id));
            await dispatch(fetchAllBoards());
        }
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Мої дошки</h1>
            <div className="home-boards-section">
                {isLoading && <h1>Завантаження даних...</h1>}
                {error && <h1>{error}</h1>}
                <ul className="home-boards-section-list">
                    {boards && boards.map(board => (
                        <li className="home-board" key={board.id}>
                            <Link className="link" to={`/board/${board.id}`}>
                                <div className="board-home-container">
                                    <BoardHome
                                        key={board.id}
                                        title={board.title}
                                    // onDelete={handleDelete}
                                    />
                                </div>

                            </Link>
                            <div className="home-button-delete" onClick={() => handleDelete(board.id)}>
                                <img src={IconDelete} alt="del" />
                                <span className="tooltiptext" title="Натисніть, щоб видалити дошку">Натисніть, щоб видалити дошку</span>
                            </div>
                            {/* <button className="home-button-delete" type="button" onClick={() => handleDelete(board.id)}></button> */}
                        </li>
                    ))}
                    <li className="add-home-board">
                        <button type="button" className="add-home-board-button" onClick={handleClick}>+ Створити дошку</button>
                    </li>
                </ul>

                
            </div>
            {isModal && <Modal visible={isModal} onClose={onClose} createBoard={handleAdd} />}
        </div>
    )
}
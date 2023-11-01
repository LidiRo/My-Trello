import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./home.scss";
import { fetchBoards, postBoards } from "../../store/reducers/ActionCreators";
import { Link } from "react-router-dom";
import { BoardHome } from "./components/BoardHome/BoardHome";
import { Modal } from "./components/Modal/Modal";

const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const Home = () => {

    const dispatch = useAppDispatch();
    const { boards, isLoading, error } = useAppSelector(state => state.boardReducer);
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);

    console.log("boards", boards)

    useEffect(() => {
        dispatch(fetchBoards());
    }, [])

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setModal(true);
    }

    const addBoard = async (title: string) => {
        if (title !== "" && PATTERN.test(title)) {
            await dispatch(postBoards(title))
        }
        await dispatch(fetchBoards());
        setModal(false);
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Мої дошки</h1>
            <div className="home-boards">
                {isLoading && <h1>Завантаження даних...</h1>}
                {error && <h1>{error}</h1>}
                {boards && boards.map(board => (
                    <div key={board.id}>
                        <Link to={`/board/${board.id}`}>
                            <BoardHome
                                key={board.id}
                                title={board.title}
                            />
                        </Link>
                    </div>
                ))}
                <button type="button" className="add-home-board-button" onClick={handleClick}>+ Створити дошку</button>
            </div>
            {isModal && <Modal visible={isModal} onClose={onClose} createBoard={addBoard} />}
        </div>
    )
}
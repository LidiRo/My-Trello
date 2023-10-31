import "./home.scss";
import { Link } from 'react-router-dom';
import { BoardHome } from "./components/BoardHome/BoardHome";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { fetchBoards } from "../../store/reducers/ActionCreators";

const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const Home = () => {

    const dispatch = useAppDispatch();
    const {boards, isLoading, error} = useAppSelector(state => state.boardReducer);

    console.log("boards", boards)

    useEffect(() => {
        dispatch(fetchBoards())
    }, [])

    function handleClick(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Мої дошки</h1>
            <div className="home-boards">
                {isLoading && <h1>Завантаження даних...</h1>}
                {error && <h1>{error}</h1>}
                {!boards || boards.map(board => (
                    <div key={board.id}>
                        <Link to={`/board/${board.id}`}>
                            <BoardHome
                                key={board.id}
                                title={board.title}
                            />
                        </Link>
                        {/* <button type="button" onClick={() => handleDelete(board.id)}>Delete</button> */}
                    </div>
                ))}
                <button type="button" className="add-home-board-button" onClick={handleClick}>+ Створити дошку</button>
            </div>
            {/* {isModal && <Modal visible={isModal} onClose={onClose} createBoard={addBoard} />} */}
        </div>
    )
}
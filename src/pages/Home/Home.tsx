import { ReactElement, useEffect, useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { BoardHome } from "./components/BoardHome/BoardHome";
import { Modal } from "./components/Modal/Modal";
import IconDelete from "../../common/images/icon-delete-2.png"
import { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addNewBoard, deleteBoard, fetchBoards } from "../../store/reducers/ActionCreators";
import { useGetBoardsQuery } from "../../store/reducers/apiSlice";

export const Home: React.FC = (): ReactElement => {

    const {
        data: boards = [],
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBoardsQuery();
    console.log("isLoading", isLoading);
    console.log("isSuccess", isSuccess);
    console.log("boards", boards);

    const [isModal, setModal] = useState(false);
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.boards);

    // useEffect(() => {
    //     if (status === 'idle') {
    //         dispatch(fetchBoards());
    //     }
        
    // }, [dispatch, status])

    const handleAdd = async (title: string) => {
        await dispatch(addNewBoard(title)).unwrap();
        dispatch(fetchBoards());
        setModal(false);
    }

    const handleDelete = async (id: number | undefined) => {
        await dispatch(deleteBoard(id)).unwrap();
        dispatch(fetchBoards());
    }

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setModal(true);
    }

    if (status === 'loading') {
        return (
            <LoadingBar
                color='#f11946'
                progress={100}
            />
        )
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Мої дошки</h1>
            <div className="home-boards-section">
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
                        ))
                    }
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
            <Toaster />
        </div>
    )
}
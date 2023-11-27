import { ReactElement, useEffect, useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { BoardHome } from "./components/BoardHome/BoardHome";
import { Modal } from "./components/Modal/Modal";
import IconDelete from "../../common/images/icon-delete-2.png"
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import { Toaster } from "react-hot-toast";
import api from '../../api/request';
import { useTypedSelector } from "../../hooks/useTypeSelecor";
import { useActions } from "../../hooks/useAction";
import LoadingBar from "react-top-loading-bar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchBoards } from "../../store/reducers/ActionCreators";

export const Home : React.FC = (): ReactElement => {

    const [isModal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const { boards } = useTypedSelector(state => state.board);
    const dispatch = useAppDispatch();
    const {boards} = useAppSelector(state => state.boards)

    // const {fetchBoards, postBoard, deleteBoard} = useActions();

    useEffect(() => {
        api.interceptors.request.use((config: any) => {
            setIsLoading(true);
            return config;
        });
        api.interceptors.response.use((response: any) => {
            setIsLoading(false);
            return response;
        });

        dispatch(fetchBoards());
    }, [])

    const handleAdd = async (title: string) => {
        // await postBoard(title);
        fetchBoards();
        setModal(false);
    }

    const handleDelete = async (id: number | undefined) => {
        // await deleteBoard(id);
        fetchBoards();
    }

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setModal(true);
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Мої дошки</h1>
            <div className="home-boards-section">
                {/* {isLoading &&
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                } */}
                {isLoading &&
                    <LoadingBar
                        color='#f11946'
                        progress={100}
                    />
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
            <Toaster />
        </div>
    )
}
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import './board.scss';
import { List } from "./components/List/List";
import CreateNewList from "./components/List/CreateNewList/CreateNewList";
import api from '../../api/request';
import toast, { Toaster } from 'react-hot-toast';
import { IList } from "../../common/interfaces/IList";
import instance from "../../api/request";
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import LoadingBar from "react-top-loading-bar";
import { ICard } from "../../common/interfaces/ICard";


const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const Board = (): ReactElement => {
    let { board_id } = useParams();

    const [lists, setLists] = useState<IList[]>([]);
    const [title, setTitle] = useState('');
    const [isBgColor, setIsBgColor] = useState<string>("#D4E2EE");
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const fetchData = async (): Promise<void> => {
            try {
                const board: { title: string, lists: IList[], custom?: { background: string } } = await instance.get(`/board/${board_id}`);
                if (board.lists !== undefined) {
                    setLists(board.lists);
                }
                setTitle(board.title);
                if (board.custom?.background && divRef.current !== null) {
                    divRef.current.style.backgroundColor = board.custom.background;
                    setIsBgColor(board.custom.background)
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

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            setIsMouseEnter(false);
        }
    }

    const changeTitleBoard = async (title: string) => {
        if (title !== "" && PATTERN.test(title)) {
            try {
                await instance.put(`/board/${board_id}`, { title: title });
                const board: { title: string } = await instance.get(`/board/${board_id}`);
                setTitle(board.title);
            } catch (err: any) {
                toast.error(err.message)
            }
        }
    }

    const handleAdd = async (title: string, namePage: string, list_id?: number, cards?: ICard[]) => {
        try {
            if (title !== "" && PATTERN.test(title)) {
                if (namePage === "list") {
                    const position = lists?.length ? lists.length + 1 : 1;
                    await instance.post(`/board/${board_id}/list`, { title, position });
                } else {
                    const position = cards?.length ? cards.length + 1 : 1;
                    const card = { title: title, list_id: list_id, position: position };
                    await instance.post(`/board/${board_id}/card`, card);
                }

                const board: { lists: IList[] } = await instance.get(`/board/${board_id}`);
                if (board.lists !== undefined) {
                    setLists(board.lists);
                }
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    }

    const handleDelete = async (id: number | undefined, namePage?: string) => {
        try {
            if (id !== undefined) {
                if (namePage === "card") {
                    await instance.delete(`/board/${board_id}/card/${id}`);
                } else {
                    await instance.delete(`/board/${board_id}/list/${id}`);
                }

                const board: { lists: IList[] } = await instance.get(`/board/${board_id}`);
                if (board.lists !== undefined) {
                    setLists(board.lists);
                }
            }
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    const changeTitle = async (title: string, list_id: number | undefined, card_id?: number | undefined, namePage?: string) => {
        if (title !== "" && PATTERN.test(title)) {
            try {
                if (namePage === "card") { 
                    await instance.put(`/board/${board_id}/card/${card_id}`, { title: title, list_id });
                } else {
                    await instance.put(`/board/${board_id}/list/${list_id}`, { title: title });
                }
                
                const board: { lists: IList[] } = await instance.get(`/board/${board_id}`);
                if (board.lists !== undefined) {
                    setLists(board.lists);
                }
            } catch (err: any) {
                toast.error(err.message)
            }
        }
    }

    const changeBackgroundColor = async (backgroundColor: string) => {
        try {
            console.log("bgColor", backgroundColor);
            if (divRef.current !== null) {
                divRef.current.style.backgroundColor = isBgColor;
            }
            await api.put(`/board/${board_id}`, { title, custom: { background: isBgColor } });
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    return (
        <div className="board-container" ref={divRef}>
            {isLoading &&
                <LoadingBar
                    color='#f11946'
                    progress={100}
                />
                // <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                //     <CircularProgress color="inherit" />
                // </Backdrop>
            }
            <div className="board-header">
                <Link to={'/'}>
                    <button type="button" className="back-home-button">Додому</button>
                </Link>
                <div className="board-title">
                    {isMouseEnter &&
                        <input
                            type="text"
                            defaultValue={title}
                            name="title"
                            onBlur={() => setIsMouseEnter(false)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTitleBoard(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={e => e.target.select()}
                            autoFocus
                        />}
                    {!isMouseEnter &&
                        <h1
                            onClick={() => setIsMouseEnter(true)}>
                            {title}
                        </h1>}
                </div>
                <div className="icon-edit">
                    {/* <img src={IconEdit} alt="edit" /> */}
                    <input
                        name="color"
                        type="color"
                        value={isBgColor}
                        onChange={e => { setIsBgColor(e.target.value) }}
                        onBlur={(e) => changeBackgroundColor(isBgColor)}
                    ></input>
                </div>
            </div>
            <div className="lists-container">
                <div className="lists">
                    {lists && lists.map((list) => (
                        <div key={list.id}>
                            <List
                                key={list.id}
                                id={list.id}
                                title={list.title}
                                cards={list.cards}
                                changeTitle={changeTitle}
                                createCard={handleAdd}
                                deleteCard={handleDelete} />
                            <button type="button" onClick={() => handleDelete(list.id)}>Delete List</button>
                        </div>
                    ))}
                </div>
                <CreateNewList createList={handleAdd} />
            </div>
            <Toaster />
        </div>
    );
}
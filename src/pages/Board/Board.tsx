import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import './board.scss';
import { List } from "./components/List/List";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAllLists, createList, deleteList, editTitleBoard, editTitleList } from "../../store/reducers/listActions";
import CreateNewList from "./components/List/CreateNewList/CreateNewList";

const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const Board = () => {

    const dispatch = useAppDispatch();
    const { lists, title, error } = useAppSelector(state => state.listReducer);
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    let { board_id } = useParams();

    useEffect(() => {
        dispatch(fetchAllLists(Number(board_id)));
    }, [dispatch, board_id])

    const handleBlur = () => {
        setIsMouseEnter(false);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        changeTitleBoard(newTitle);
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            setIsMouseEnter(false);
        }
    }

    const changeTitleBoard = async (title: string) => {
        if (title !== "" && PATTERN.test(title)) {
            try {
                await dispatch(editTitleBoard(title, Number(board_id)));
                await dispatch(fetchAllLists(Number(board_id)));
            } catch (err: any) {
                await dispatch(fetchAllLists(Number(board_id)));
            }
        }
    }

    const handleAdd = async (title: string) => {
        if (title !== "" && PATTERN.test(title)) {
            const position = lists?.length ? lists.length + 1 : 1;
            await dispatch(createList(title, Number(board_id), position))
        }
        await dispatch(fetchAllLists(Number(board_id)));
    }

    const handleDelete = async (id: number | undefined) => {
        try {
            if (id !== undefined) {
                await dispatch(deleteList(Number(board_id), id));
                await dispatch(fetchAllLists(Number(board_id)));
            }
        } catch (err: any) {
            await dispatch(fetchAllLists(Number(board_id)));
        }
    }

    const changeTitleList = async (title: string, id: number | undefined) => {
        if (title !== "" && PATTERN.test(title)) {
            try {
                await dispatch(editTitleList(title, Number(board_id), id));
                await dispatch(fetchAllLists(Number(board_id)));
            } catch (err: any) {
                await dispatch(fetchAllLists(Number(board_id)));
            }
        }
    }

    return (
        <div className="board-container">
            <div className="board-header">
                <Link to={'/'}>
                    <button type="button" className="back-home-button">Додому</button>
                </Link>
                <div className="board-title">
                    {isMouseEnter && <input type="text" defaultValue={title} name="title" onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={e => e.target.select()} autoFocus />}
                    {!isMouseEnter &&
                        <h1
                            onClick={() => setIsMouseEnter(true)}>
                            {title}
                        </h1>}
                </div>
            </div>
            <div className="lists-container">
                <div className="lists">
                    {error && <h1>{error}</h1>}
                    {lists && lists.map((list) => (
                        <div key={list.id}>
                            <List key={list.id} id={list.id} title={list.title} cards={list.cards} changeTitle={changeTitleList} />
                            <button type="button" onClick={() => handleDelete(list.id)}>Delete</button>
                        </div>
                    ))}
                </div>
                <CreateNewList createList={handleAdd} />
            </div>
        </div>
    );
}
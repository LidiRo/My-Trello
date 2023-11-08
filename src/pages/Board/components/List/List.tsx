import React, { useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import IconDelete from "../../../../images/icon-delete.svg"
import CreateNewCard from "../Card/CreateNewCard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useParams } from "react-router-dom";
import { createCard, deleteCard, editCard, fetchAllCards } from "../../../../store/reducers/cardActions";
import { fetchAllLists } from "../../../../store/reducers/listActions";
import { ICard } from "../../../../common/interfaces/ICard";
import toast, { Toaster } from 'react-hot-toast';


const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const List = (props: {
    id?: number;
    title: string;
    cards?: ICard[];
    changeTitle: (title: string, id: number | undefined) => void;
}
) => {
    const dispatch = useAppDispatch();
    const { cards, error } = useAppSelector(state => state.cardReducer);
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    let { board_id } = useParams();

    const handleBlur = () => {
        setIsMouseEnter(false);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (newTitle !== undefined) {
            props.changeTitle(newTitle, props.id)
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            setIsMouseEnter(false);
        }
    }

    const handleClickTitle = () => {
        setIsMouseEnter(true);
    }

    const handleAdd = async (title: string) => {
        if (title !== "" && PATTERN.test(title)) {
            const position = cards?.length ? cards.length + 1 : 1;
            await dispatch(createCard(title, Number(board_id), Number(props.id), position))
        }
        await dispatch(fetchAllLists(Number(board_id)));
    }

    const changeTitleCard = async (title: string, id: number | undefined, list_id: number | undefined) => {
        if (title !== "" && PATTERN.test(title)) {
            try {
                await dispatch(editCard(title, Number(board_id), id, list_id));
                await dispatch(fetchAllLists(Number(board_id)));
            } catch (err: any) {
                toast.error(err.message)
            }
        }
    }

    const onDeleteCard = async (board_id: number | undefined, id: number | undefined) => {
        try {
            if (id !== undefined) {
                await dispatch(deleteCard(Number(board_id), id));
                await dispatch(fetchAllLists(Number(board_id)));
            }
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    return (
        <div className="list-container">
            <div className="list-title">
                {isMouseEnter &&
                    <input type="text" defaultValue={props.title} name="title" onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={e => e.target.select()} autoFocus />
                }
                {!isMouseEnter &&
                    <h2 className="list-title" onClick={handleClickTitle}>
                        {props.title}
                    </h2>}
            </div>
            <div className="cards-container">
                <ul className="cards">
                    {props.cards && props.cards.map(el =>
                        <Card key={el.id} id={el.id} listId={Number(props.id)} title={el.title} changeTitle={changeTitleCard} deleteCard={() => onDeleteCard(Number(board_id), el.id)} />)}
                </ul>
            </div>
            <div className="add-card-button-container">
                <CreateNewCard createCard={handleAdd} listId={Number(props.id)} />
            </div>
            <Toaster />
        </div>);
}
import React, { useEffect, useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { Slot } from "../Slot/Slot";
import { dragStartReducer } from "../../../../store/reducers/SlotSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";

export const List = (props: {
    id?: number;
    title: string;
    cards: ICard[];
    changeTitle: (title: string, list_id: number | undefined, card_id?: number | undefined, namePage?: string) => void;
    createCard: (title: string, namePage: string, list_id?: number, cards?: ICard[], position?: number) => void;
    deleteCard: (id: number | undefined, namePage?: string) => void;
    deleteList: (id: number | undefined, namePage?: string) => void;
}) => {
    const dispatch = useAppDispatch();
    const { cards } = props;
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const position = cards?.length ? cards.length + 1 : 1;

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, namePage?: string) => {
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

    const [isVisibleSlot, setIsVisibleSlot] = useState<boolean[]>(cards.map(() => false));

    const { draggingCard } = useAppSelector(state => state.slots)

    //************DRAGGIND CARD****************/

    function dragStart(e: any, card: ICard) {
        console.log('Start');
        const draggingElement = e.currentTarget;
        e.dataTransfer.setData('text/plaid', draggingElement.id)
        setTimeout(() => {
            draggingElement.classList.add('dragging');
        })
        dispatch(dragStartReducer(card))
    }

    function dragEnd(e: any) {
        console.log('End');
        e.target.classList.remove('dragging');
        setIsVisibleSlot(cards.map((card) => false))
    }

    //************DROP ZONE****************/

    function dragOver(e: any, container: any) {
        e.preventDefault();
    }

    function dragEnter(e: any, card: ICard) {
        e.preventDefault();
        if (!draggingCard) return;
        if (card.id === draggingCard.id) return;

        const box = e.currentTarget.getBoundingClientRect();
        const centerBox = box.top + box.height / 2;
        if (centerBox < e.clientY) {
            setIsVisibleSlot(isVisibleSlot.map((_, index: number) => {
                if (draggingCard?.position) {
                    if (index === draggingCard.position - 1) {
                        return true;
                    }
                }
                return false
            }))
        }

        if (centerBox >= e.clientY) {
            setIsVisibleSlot(isVisibleSlot.map((_, index: number) => {
                if (draggingCard?.position) {
                    if (index === draggingCard.position) {
                        return true;
                    }
                }
                return false
            }))
        }
    }

    function dragLeave(e: any,) {
        
    }

    function dragDrop(e: any) {
    }

    return (
        <div className="list-container">
            <div className="list-title">
                {isMouseEnter &&
                    <input
                        type="text"
                        defaultValue={props.title}
                        name="title"
                        onBlur={() => setIsMouseEnter(false)}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={e => e.target.select()}
                        autoFocus
                    />
                }
                {!isMouseEnter &&
                    <h2 className="list-title" onClick={() => setIsMouseEnter(true)}>
                        {props.title}
                    </h2>}
            </div>
            <div className="cards-container">
                <ul className="cards">
                    {cards &&
                        cards.map((card: ICard, index: number) => {
                            return (
                                <li
                                    key={card.id}
                                    className="drop-zone"
                                    onDragEnter={(e: any) => dragEnter(e, card)}
                                >
                                    {isVisibleSlot[index] &&
                                        <div className="slot">SLOT</div>
                                    }
                                    <div
                                        key={card.id}
                                        id={`${card.id}`}
                                        className="card"
                                        draggable="true"
                                        onDragStart={(e: any) => dragStart(e, card)}
                                        onDragEnd={(e: any) => dragEnd(e)}
                                    >
                                        <Card
                                            key={card.id}
                                            id={card.id}
                                            listId={Number(props.id)}
                                            title={card.title}
                                            index={index}
                                            visibleSlot={isVisibleSlot[index]}
                                            changeTitle={props.changeTitle}
                                            deleteCard={() => props.deleteCard(card.id, "card")}
                                        />
                                    </div>
                                </li>
                            )
                        }
                        )}
                </ul>
            </div>
            <div className="add-card-button-container">
                <CreateNewCard
                    listId={Number(props.id)}
                    createCard={(title: string) => props.createCard(title, "card", props.id, cards, position)}
                    deleteList={props.deleteList}
                />
            </div>
        </div>);
}
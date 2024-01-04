import React, { createElement, useEffect, useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { Slot } from "../Slot/Slot";
import { dragStartReducer, getCoordinatesCard } from "../../../../store/reducers/SlotSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { log } from "console";
import { useParams } from "react-router-dom";
import { editPositionCard } from "../../../../store/action-creators/CardsActionCreators";
import { fetchLists } from "../../../../store/action-creators/ListsActionCreators";

export const List = (props: {
    id?: number;
    title: string;
    cards: ICard[];
    changeTitle: (title: string, list_id: number | undefined, card_id?: number | undefined, namePage?: string) => void;
    createCard: (title: string, namePage: string, list_id?: number, cards?: ICard[], position?: number) => void;
    deleteCard: (id: number | undefined, namePage?: string) => void;
    changePositionCards: (position: number, list_id: number | undefined, card_id?: number | undefined, namePage?: string) => void;
    // changePositionCards: (list_id: number | undefined, cards: ICard[], namePage?: string) => void;
    deleteList: (id: number | undefined, namePage?: string) => void;
}) => {
    const dispatch = useAppDispatch();
    const { cards } = props;
    let { board_id } = useParams();
    // console.log('board_id', board_id)
    // const [cards, setCards] = useState<ICard[] | []>(props.cards)
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    
    // console.log("cards start" , cards)
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

    const [isVisibleSlot, setIsVisibleSlot] = useState<HTMLElement | null>(null)
    const { draggingCard } = useAppSelector(state => state.slots)
    const [isDraggindCard, setIsDraggingCard] = useState<ICard | null>(null);
    const [isDraggingElement, setIsDraggindElement] = useState<HTMLElement | null>(null);

    function dragStart(e: any, card: ICard) {
        const draggingElement = e.currentTarget;
        setIsDraggindElement(draggingElement);
        setTimeout(() => {
            draggingElement.classList.add('dragging');
        }, 0)
        dispatch(dragStartReducer(card))
    }

    function dragEnd(e: any) {
        e.target.classList.remove('dragging');
        isVisibleSlot?.classList.remove('is-visible');
    }

    function dragOver(e: any) {
        e.preventDefault();
    }
    
    function dragEnter(e: any, card: ICard) {
        e.preventDefault();
        setIsDraggingCard(draggingCard);
        if (!draggingCard) return;

        const slotBefore = e.currentTarget.parentNode.querySelector('.card-clot-before');
        const slotAfter = e.currentTarget.parentNode.querySelector('.card-clot-after');
        const currentCard = e.currentTarget;
        const box = currentCard.getBoundingClientRect();

        if (e.clientY < (box.y + box.height / 2)) {
            // console.log("pos - 1");
            if (slotAfter && e.currentTarget.parentNode !== isDraggingElement) {
                isDraggingElement?.classList.add('hidden-card');
                isVisibleSlot?.classList.remove('is-visible');
                slotAfter.classList.add('is-visible');
            }
            setIsVisibleSlot(slotAfter);
        }

        if (e.clientY > (box.y + box.height / 2) && e.currentTarget.parentNode !== isDraggingElement) {
            // console.log("pos +1");
            if (slotBefore) {
                isDraggingElement?.classList.add('hidden-card');
                isVisibleSlot?.classList.remove('is-visible');
                slotBefore.classList.add('is-visible');
            }
            setIsVisibleSlot(slotBefore);
        }
    }

    console.log("cards start", cards)
    
    function dragDrop(e: any, card: ICard) {
        e.preventDefault();
        if (!draggingCard) return;
        let indexStart: number;
        let indexEnd: number;

        let isAbove: boolean = draggingCard.position < card.position;

        
        if (isAbove) {
            indexStart = draggingCard.position - 1;
            indexEnd = card.position - 1;
            if (isVisibleSlot?.classList.contains('card-clot-before')) {
                indexEnd -= 1;
            }
        } else {
            indexStart = card.position - 1;
            indexEnd = draggingCard.position - 1;
        }
        // console.log("draggingCard position: ", draggingCard.position, " card position:", card.position)
        // console.log("indexStart: ", indexStart, ", indexEnd:", indexEnd);
        
        // [...cards]
        //     .map(async (card: ICard, index: number) => {
        //         let position: number = card.position;
        //         if (index >= indexStart && index <= indexEnd) {
                    
        //             // console.log("index: ", index, isAbove)
        //             // console.log("draggingCard: ", draggingCard.position, " card:", card.position)
        //             if (isAbove) { 
        //                 position = index === indexStart ? indexEnd + 1 : card.position - 1;
        //             }
        //             else {
        //                 position = index === indexEnd ? indexStart + 1 : card.position + 1;
        //             }
        //             // console.log("card ", card.id, ": new position ", position)
                    
        //             // let newCard = { ...card };
        //             props.changePositionCards(position, props.id, card.id, "card")
        //             // return { ...newCard, position: position }
        //         }
                
        //         // return card;
        //     })
            // .sort((a, b) => a.position - b.position);
        
        isDraggingElement?.classList.remove('hidden-card');
        
        // if (draggingCard) {
        //     let indexStart = draggingCard.position - 1;
        //     let indexEnd = card.position - 1;
        //     if (isVisibleSlot?.classList.contains('card-clot-before')) {
        //         indexEnd -= 1;
        //     }

            const arrCards = [...cards]
                .map((card: ICard, index: number) => {
                    let position: number = card.position;
                    if (index >= indexStart && index <= indexEnd) {
                        if (isAbove) {
                            position = index === indexStart ? indexEnd + 1 : card.position - 1;
                        }
                        else {
                            position = index === indexEnd ? indexStart + 1 : card.position + 1;
                        }
                        props.changePositionCards(position, props.id, card.id, "card")
                        let newCard = { ...card };
                        return { ...newCard, position: position }
                    }
                    return card;
                })
                .sort((a, b) => a.position - b.position);
        console.log("cards drop", arrCards)
        // props.changePositionCards(props.id, arrCards, "card")
            // setCards(arrCards);
        //     // props.changePositionCards(props.id, arrCards);
        // }
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
                <ol className="cards">
                    {cards &&
                        [...cards]
                            .sort((a, b) => a.position - b.position)
                            .map((card: ICard, index: number) => {
                                return (
                                    <li
                                        key={card.id}
                                        className="card"
                                        draggable="true"
                                        onDragStart={(e: any) => dragStart(e, card)}
                                        onDragEnd={(e: any) => dragEnd(e)}
                                        onDragOver={(e: any) => dragOver(e)}
                                        onDrop={(e: any) => dragDrop(e, card)}
                                    >
                                        <div className="card-clot-before"></div>
                                        <div className="card-container"
                                            onDragEnter={(e: any) => dragEnter(e, card)}
                                        >
                                        <Card
                                            key={card.id}
                                            id={card.id}
                                            listId={Number(props.id)}
                                            title={card.title}
                                            index={index}
                                            changeTitle={props.changeTitle}
                                            deleteCard={() => props.deleteCard(card.id, "card")}
                                            />
                                        </div>
                                        <div className="card-clot-after"></div>
                                        
                                    </li>
                                )
                            }
                            )}
                </ol>
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
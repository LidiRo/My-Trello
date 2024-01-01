import React, { useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { dragStartReducer } from "../../../../store/reducers/SlotSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";

export const List = (props: {
    id?: number;
    title: string;
    cards: ICard[];
    changeTitle: (title: string, list_id: number | undefined, card_id?: number | undefined, namePage?: string) => void;
    createCard: (title: string, namePage: string, list_id?: number, cards?: ICard[], position?: number) => void;
    deleteCard: (id: number | undefined, namePage?: string) => void;
    changePositionCards: (position: number, list_id: number | undefined, card_id?: number | undefined, namePage?: string) => void;
    deleteList: (id: number | undefined, namePage?: string) => void;
}) => {
    const dispatch = useAppDispatch();
    const { cards } = props;
    const position = cards?.length ? cards.length + 1 : 1;

    const arrCards = [...cards];
    const [isMouseEnter, setIsMouseEnter] = useState(false);

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

    const { draggingCard } = useAppSelector(state => state.slots)

    const [isDraggingElement, setIsDraggindElement] = useState<HTMLElement | null>(null);

    function dragStart(e: any, card: ICard) {
        // console.log('Start');
        const draggingElement = e.currentTarget;
        setIsDraggindElement(draggingElement);
        setTimeout(() => {
            draggingElement.classList.add('dragging');
        }, 0)
        dispatch(dragStartReducer(card))
    }

    function dragEnd(e: any) {
        // console.log('End');
        e.target.classList.remove('dragging');
        isVisibleSlot?.classList.remove('is-visible');

    }

    function dragOver(e: any) {
        e.preventDefault();
        // console.log("Drop", e.currentTarget.parentNode);
        // console.log("isDraggingElement", isDraggingElement);
    }

    const [isVisibleSlot, setIsVisibleSlot] = useState<HTMLElement | null>(null);

    function dragEnter(e: any, card: ICard) {
        e.preventDefault();

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

    function dragLeave(e: any,) {
    }

    function dragDrop(e: any, card: ICard) {
        e.preventDefault();
        // console.log("Drop", e.currentTarget.parentNode);
        // console.log("isDraggingElement", isDraggingElement);
        // isDraggingElement?.classList.remove('hidden-card');
        // const newCard = isDraggingElement;
        // e.currentTarget.parentNode.appendChild(newCard);
        // console.log(draggingCard?.title)
        console.log("draggingCard", draggingCard)
        if (draggingCard) {
            // props.changePositionCards(card.position, props.id, card.id, "card")
            // props.createCard(draggingCard.title, "card", props.id, cards, card.position)
        }

        // props.deleteCard(draggingCard?.id, 'card')
        console.log(cards)

    }

    function handleDrag(e: any) {
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
                        cards
                            // .sort((a, b) => a.position - b.position)
                            .map((card: ICard, index: number) => {
                                return (
                                    <li
                                        key={card.id}
                                        className="card"
                                        draggable="true"
                                        onDragStart={(e: any) => dragStart(e, card)}
                                        onDragEnd={(e: any) => dragEnd(e)}
                                        onDragOver={(e: any) => dragOver(e)}
                                        // onDragLeave={(e: any) => dragLeave(e)}
                                        // onDragEnter={(e: any) => dragEnter(e)}
                                        onDrop={(e: any) => dragDrop(e, card)}
                                        onDrag={(e: any) => handleDrag(e)}
                                    >

                                        <div className="card-clot-before"></div>
                                        <div className="card-container"
                                            onDragLeave={(e: any) => dragLeave(e)}
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
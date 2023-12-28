import React, { createElement, useEffect, useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { Slot } from "../Slot/Slot";
import { dragStartReducer, getCoordinatesCard } from "../../../../store/reducers/SlotSlice";
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
    const arrCards = [...cards];
    // console.log(arrCards)
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

    const { draggingCard, coordinatesCard } = useAppSelector(state => state.slots)

    const [isDraggingElement, setIsDraggindElement] = useState<HTMLElement | null>(null);

    //************DRAGGIND CARD****************/

    function dragStart(e: any, card: ICard) {
        // console.log('Start');
        const draggingElement = e.currentTarget;
        const coordinatesDraggingElement = draggingElement.getBoundingClientRect();
        const coordinates = {
            top: coordinatesDraggingElement.top,
            bottom: coordinatesDraggingElement.bottom,
            height: coordinatesDraggingElement.height,
            width: coordinatesDraggingElement.width,
            y: coordinatesDraggingElement.y,
        }

        // e.dataTransfer.setDragImage(draggingElement, coordinatesDraggingElement.width / 2, coordinatesDraggingElement.height / 2)
        // console.log(coordinates.y);
        setIsDraggindElement(draggingElement);
        // e.dataTransfer.setData('text/plaid', draggingElement.id)
        setTimeout(() => {
            draggingElement.classList.add('dragging');
        }, 0)

        dispatch(dragStartReducer(card))
        dispatch(getCoordinatesCard(coordinates));

        
    }

    function dragEnd(e: any) {
        // console.log('End');
        e.target.classList.remove('dragging');
        // setIsVisibleSlot(cards.map((card) => false))
    }

    //************DROP ZONE****************/

    function dragOver(e: any, container: any) {
        e.preventDefault();
    }
    

    const slot = document.createElement("div");
    slot.classList.add("slot-visible");

    function dragEnter(e: any) {
        e.preventDefault();
        // console.log(coordinatesCard.y)
        // console.log('Enter', e.currentTarget)
        
        // const newArr = [...cards];
        // console.log("newArr 1", arrCards);
        // arrCards.push(arrCards[0]);
        // console.log("newArr 2", arrCards);

        if (!draggingCard) return;
        const currentCard = e.currentTarget;
        const box = currentCard.getBoundingClientRect();
        const centerBox = box.top + box.height / 2;
        
        // const closest = currentCard.closest('.cards')

        console.log("e.clientY + box.height > centerBox", e.clientY, ' + ', box.height, ' > ', centerBox, ' = pos - 1')
        console.log("e.clientY + box.height <= box.y", e.clientY, ' + ', box.height, ' <= ', box.y, ' = pos + 1')
        
        // console.log("e.clientY", e.clientY)
        // console.log("centerBox", centerBox)
        // console.log(currentCard.closest('.cards'))
        // if (card.id === draggingCard.id) return;
        // slot.classList.add("is-visible");

        if (e.clientY + box.height > centerBox) {
            console.log("pos - 1");
            /** видаляється картка, що перетягується */
            // isDraggingElement?.classList.add('hidden-card');

            /** додаю слот */
            // currentCard.after(slot);
        }

        if (e.clientY + box.height <= box.y) {
            console.log("pos + 1")
            // currentCard.before(slot);
            
        }
        // console.log(currentCard.closest('.cards'))
    }
    
    function dragLeave(e: any,) {
        // slot.remove();

        // console.log('Leave', e.currentTarget);
        // console.log(isDraggingElement);
        // if (e.currentTarget === isDraggingElement) {
        //     // isDraggingElement?.classList.add('hidden-card');
        // }
        // beforeCard?.classList.remove('is-visible');
        // afterCard?.classList.remove('is-visible');
        // slot.remove();
    }

    function dragDrop(e: any) {
        e.preventDefault();
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
                    {arrCards &&
                        arrCards
                            .sort((a, b) => a.position - b.position)
                            .map((card: ICard, index: number) => {
                                return (
                                    <li
                                        key={card.id}
                                        className="card"
                                        draggable="true"
                                        onDragStart={(e: any) => dragStart(e, card)}
                                        onDragEnd={(e: any) => dragEnd(e)}
                                        onDragLeave={(e: any) => dragLeave(e)}
                                        onDragEnter={(e: any) => dragEnter(e)}
                                        onDrop={(e: any) => dragDrop(expect)}
                                    >
                                        {/* <div
                                        key={card.id}
                                        className="card"
                                    > */}
                                        {/* <div className="card-clot-before"></div> */}
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
                                        {/* <div className="card-clot-after"></div> */}
                                        {/* </div> */}
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
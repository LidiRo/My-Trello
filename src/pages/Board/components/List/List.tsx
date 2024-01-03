import React, { createElement, useEffect, useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { Slot } from "../Slot/Slot";
import { dragStartReducer, getCoordinatesCard } from "../../../../store/reducers/SlotSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { log } from "console";

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
    // const [cards, setCards] = useState<ICard[] | []>(props.cards)
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    console.log("cards start" , cards)
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

    // const [isVisibleSlot, setIsVisibleSlot] = useState<boolean[]>(cards.map(() => false));
    const [isVisibleSlot, setIsVisibleSlot] = useState<HTMLElement | null>(null)
    const { draggingCard } = useAppSelector(state => state.slots)
    const [isDraggindCard, setIsDraggingCard] = useState<ICard | null>(null);
    const [isDraggingElement, setIsDraggindElement] = useState<HTMLElement | null>(null);

    //************DRAGGIND CARD****************/

    function dragStart(e: any, card: ICard) {
        // // console.log('Start');
        // const draggingElement = e.currentTarget;
        // const coordinatesDraggingElement = draggingElement.getBoundingClientRect();
        // const coordinates = {
        //     top: coordinatesDraggingElement.top,
        //     bottom: coordinatesDraggingElement.bottom,
        //     height: coordinatesDraggingElement.height,
        //     width: coordinatesDraggingElement.width,
        //     y: coordinatesDraggingElement.y,
        // }
        // // setCoor(e.clientY)

        // // e.dataTransfer.setDragImage(draggingElement, coordinatesDraggingElement.width / 2, coordinatesDraggingElement.height / 2)
        // // console.log(coordinates.y);
        // setIsDraggindElement(draggingElement);
        // // e.dataTransfer.setData('text/plaid', draggingElement.id)
        // setTimeout(() => {
        //     draggingElement.classList.add('dragging');
        // }, 0)

        // dispatch(dragStartReducer(card))
        // dispatch(getCoordinatesCard(coordinates));

        // console.log('Start');
        const draggingElement = e.currentTarget;
        setIsDraggindElement(draggingElement);
        setTimeout(() => {
            draggingElement.classList.add('dragging');
        }, 0)
        dispatch(dragStartReducer(card))
    }

    function dragEnd(e: any) {
        // // console.log('End');
        // e.target.classList.remove('dragging');
        // // setIsVisibleSlot(cards.map((card) => false))

        e.target.classList.remove('dragging');
        isVisibleSlot?.classList.remove('is-visible');
    }

    //************DROP ZONE****************/

    function dragOver(e: any) {
        e.preventDefault();
    }
    

    // const slot = document.createElement("div");
    // slot.classList.add("slot-visible");

    // function dragEnter(e: any) {
    //     e.preventDefault();
    //     // console.log(isDraggingElement?.getBoundingClientRect())
    //     // console.log('Enter', e.currentTarget)
        
    //     // const newArr = [...cards];
    //     // console.log("newArr 1", arrCards);
    //     // arrCards.push(arrCards[0]);
    //     // console.log("newArr 2", arrCards);

    //     if (!draggingCard) return;
    //     const currentCard = e.currentTarget;
    //     const box = currentCard.getBoundingClientRect();
    //     const centerBox = box.top + box.height / 2;
    //     isDraggingElement?.addEventListener("mousemove", (e: any) => { setCoor(e.clientY) })
    //     // console.log(coor)
    //     // console.log("e.pageY on enter ", e.pageY)
    //     // const closest = currentCard.closest('.cards')

    //     // console.log("e.clientY + box.height > centerBox", coor, ' + ', box.height, ' > ', centerBox, ' = pos - 1')
    //     // console.log("e.clientY  <= centerBox", coor, ' <= ', centerBox, ' = pos + 1')
        
    //     // console.log("e.clientY", e.clientY)
    //     // console.log("centerBox", centerBox)
    //     // console.log(currentCard.closest('.cards'))
    //     // if (card.id === draggingCard.id) return;
    //     // slot.classList.add("is-visible");

    //     // if (coor) {
    //     //     console.log('coor > box.y = ', coor, ', ', box.y, " => pos - 1");
    //     //     console.log('coor <= box.bottom = ', coor, ', ', box.bottom, " => pos + 1");
    //     // }

    //     if (coor && coor < box.y) {
    //         console.log("pos - 1");
    //         /** видаляється картка, що перетягується */
    //         isDraggingElement?.classList.add('hidden-card');
    //         slot.remove();
    //         /** додаю слот */
    //         currentCard.after(slot);
    //     }

    //     if (coor && coor >= box.bottom) {
    //         console.log("pos + 1")
    //         slot.remove();
    //         currentCard.before(slot);
            
    //     }
    //     // console.log(currentCard.closest('.cards'))
    // }
    function dragEnter(e: any, card: ICard) {
        e.preventDefault();
        setIsDraggingCard(draggingCard);
        if (!draggingCard) return;

        // console.log(isDraggindCard)

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

    // function dragDrop(e: any) {
    //     e.preventDefault();
    // }

    function dragDrop(e: any, card: ICard) {
        e.preventDefault();
        
        if (draggingCard) {
            let indexStart = draggingCard.position - 1;
            let indexEnd = card.position - 1;
            if (isVisibleSlot?.classList.contains('card-clot-before')) {
                indexEnd -= 1;
            }

            // const arrCards = [...cards]
            //     .map((card: ICard, index: number) => {
            //         if (index >= indexStart && index <= indexEnd) {
            //             let position = index === indexStart ? indexEnd + 1 : card.position - 1;
            //             let newCard = { ...card };
            //             return { ...newCard, position: position }
            //         }
            //         return card;
            //     })
            //     .sort((a, b) => a.position - b.position);

            // setCards(arrCards);
            // props.changePositionCards(props.id, arrCards);

            [...cards]
                .map((card: ICard, index: number) => {
                    if (index >= indexStart && index <= indexEnd) {
                        let position = index === indexStart ? indexEnd + 1 : card.position - 1;
                        let newCard = { ...card };
                        props.changePositionCards(position, props.id, card.id, "card")
                        return { ...newCard, position: position }
                    }
                    return card;
                })
                // .sort((a, b) => a.position - b.position);
                
            // setCards(arrCards);

            console.log("cards drop", cards)
            isDraggingElement?.classList.remove('hidden-card');
        }
    }

    function handleDrag(e: any) {
        
        // if(coor)
        // console.log("e.pageY on drag ", e.clientY - coor)
        
        // setCoor(e.clientY)

    }

    function handleMouseMove(e: any) {
        // setCoor(e.pageY)
        // console.log(isDraggingElement?.getBoundingClientRect())
    }

    const [coor, setCoor] = useState();

    // console.log(coor)

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
                                        // onDragLeave={(e: any) => dragLeave(e)}
                                        // onDragEnter={(e: any) => dragEnter(e)}
                                        onDrop={(e: any) => dragDrop(e, card)}
                                        onDrag={(e: any) => handleDrag(e)}
                                        onMouseMove={(e: any) => handleMouseMove(e)}
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
                                            // visibleSlot={isVisibleSlot[index]}
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
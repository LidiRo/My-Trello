import React, { useEffect, useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { getDraggingCard, getCurrentCards, getCurrentList } from "../../../../store/reducers/SlotSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { Link, useParams } from "react-router-dom";
import { addNewCard, editPositionCard } from "../../../../store/action-creators/CardsActionCreators";
import { fetchLists } from "../../../../store/action-creators/ListsActionCreators";
import { showModalCardWindow } from "../../../../store/reducers/CardSlice";
import IconDescription from "../../../../common/images/icon-description3.png"

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
    let { board_id } = useParams();
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const [isVisibleSlot, setIsVisibleSlot] = useState<boolean[]>(cards.map(() => false))
    const [isBeforeCard, setIsBeforeCard] = useState<boolean>(false);
    const [isAfterCard, setIsAfterCard] = useState<boolean>(false);
    const { draggingCard, currentList, currentCards } = useAppSelector(state => state.slots)
    const [isDraggingElement, setIsDraggindElement] = useState<HTMLElement | null>(null);

    // console.log(document.location.pathname)

    useEffect(() => {
        setIsVisibleSlot(cards.map(() => false))
    }, [cards])

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

    function dragStart(e: any, card: ICard) {
        const draddingElement = e.currentTarget;
        setIsDraggindElement(draddingElement);
        setTimeout(() => {
            draddingElement.classList.add('dragging');
        }, 0)
        dispatch(getDraggingCard(card));
        dispatch(getCurrentList(props.id));
        dispatch(getCurrentCards(cards));
    }

    function dragEnd(e: any) {
        e.target.classList.remove('dragging');
        isDraggingElement?.classList.remove('hidden-card');
        setIsVisibleSlot(isVisibleSlot.map(() => false))
    }

    function dragOver(e: any) {
        e.preventDefault();
    }

    function dragEnter(e: any, card: ICard, index: number) {
        e.preventDefault();
        if (!draggingCard) return;
        const box = e.currentTarget.getBoundingClientRect();
        const centerDropCard = box.y + box.height / 2;
        if (e.currentTarget.parentNode !== isDraggingElement) {
            isDraggingElement?.classList.add('hidden-card');
            setIsVisibleSlot(isVisibleSlot.map((_, i: number) => {
                if (i === index) {
                    return isVisibleSlot[i] = true;
                }
                return false
            }))
            if (e.clientY < centerDropCard) {
                setIsBeforeCard(false);
                setIsAfterCard(true);
            }

            if (e.clientY > centerDropCard) {
                setIsAfterCard(false);
                setIsBeforeCard(true);
            }
        }
    }

    function handleDrag(e: any) {
        e.preventDefault();
        //         const box = currentCard.getBoundingClientRect();
        // if (e.clientX > currentCardCoordinates.left && e.clientX < currentCardCoordinates.right) {
        //     console.log("e.clientY", e.clientY, 'e.clientX', e.clientX)
        // }
        // console.log(currentCardCoordinates)
        // draggingElement.parentNode.classList.add('drop-zone');
    }

    function dragLeave(e: any) {
        e.preventDefault();
    }

    async function dragDrop(e: any, card: ICard) {
        e.preventDefault();
        isDraggingElement?.classList.remove('hidden-card');
        setIsVisibleSlot(isVisibleSlot.map(() => false))
        if (!draggingCard) return;
        let indexStart: number;
        let indexEnd: number;
        let isAbove: boolean = draggingCard.position < card.position;
        let position: number;
        if (props.id === currentList) {
            if (isAbove) {
                indexStart = draggingCard.position - 1;
                indexEnd = card.position - 1;
                if (isBeforeCard) {
                    indexEnd -= 1;
                }
            } else {
                indexStart = card.position - 1;
                indexEnd = draggingCard.position - 1;
            }

            for (let i = indexEnd; i >= indexStart; i--) {

                if (isAbove) {
                    position = i === indexStart ? indexEnd + 1 : cards[i].position - 1;
                }
                else {
                    position = i === indexEnd ? indexStart + 1 : cards[i].position + 1;
                }
                await dispatch(editPositionCard({ board_id: Number(board_id), card: [{ id: cards[i].id, position: position, list_id: Number(props.id) }] }));
            }
        } else {
            let positionNewCard: number;
            if (isAfterCard) {
                positionNewCard = card.position + 1;
            } else {
                positionNewCard = card.position;
            }
            await dispatch(addNewCard({ board_id: Number(board_id), card: { title: draggingCard.title, list_id: Number(props.id), position: positionNewCard } }))
            props.deleteCard(draggingCard.id, "card");
            if (!currentCards) return;
            indexStart = draggingCard.position;
            indexEnd = currentCards.length - 1;
            for (let i = indexEnd; i >= indexStart; i--) {
                position = currentCards[i].position - 1;
                await dispatch(editPositionCard({ board_id: Number(board_id), card: [{ id: currentCards[i].id, position: position, list_id: Number(currentList) }] }));
            }
        }
        await dispatch(fetchLists(Number(board_id)));
    }

    function showCardModal(card: ICard) {
        dispatch(showModalCardWindow({ card: card, listId: props.id, listTitle: props.title}));
    }

    // console.log(cards)
    return (
        <div className="list-container"
            onDragOver={(e: any) => dragOver(e)}
            // onDragLeave={(e:any) => console.log(props.id)}
            // onDragEnter={(e: any) => console.log("list-container",e.currentTarget)}
            onDrop={(e: any) => e.preventDefault()}
        // onDragEnter={(e: any) => dragEnterList(e)}
        // onDrag={(e: any) => console.log(e.target)}
        >
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
                <ol className="cards"
                // onDragLeave={(e: any) => dragLeave(e)}
                // onDragOver={(e: any) => dragOver(e)}

                >
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
                                        // onDragOver={(e: any) => dragOver(e)}
                                        onDrop={(e: any) => dragDrop(e, card)}
                                        onDrag={(e: any) => handleDrag(e)}
                                    // onDragLeave={(e: any) => dragLeave(e, card)}
                                    >
                                        {isVisibleSlot[index] && isBeforeCard &&
                                            <div className="slot"></div>
                                        }
                                        <Link className="link" to={`/board/${board_id}/card/${card.id}`}>
                                            <div className="card-container card-title"
                                                onDragEnter={(e: any) => dragEnter(e, card, index)}
                                                onDragLeave={(e: any) => dragLeave(e)}
                                                onClick={() => { showCardModal(card)}}
                                            >
                                                {card.title}
                                                {card.description &&
                                                    <div className="card-title-description">
                                                        <img src={IconDescription} alt="Description" className="icon-description" />
                                                        <span className="tooltiptext-card" title="Натисніть, щоб видалити дошку">
                                                            Ця картка має опис
                                                        </span>
                                                    </div>
                                                    
                                                }
                                                {/* <img src={IconDescription} alt="Description" className="icon-description" /> */}
                                            </div>
                                        </Link>
                                        {isVisibleSlot[index] && isAfterCard &&
                                            <div className="slot"></div>
                                        }
                                    </li>
                                )
                            }
                            )}
                </ol>
            </div>
            <div className="add-card-button-container">
                <CreateNewCard
                    listId={Number(props.id)}
                    createCard={(title: string) => props.createCard(title, "card", props.id, cards)}
                    deleteList={props.deleteList}
                />
            </div>
        </div>);
}
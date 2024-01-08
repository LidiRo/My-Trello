import React, { useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { dragStartReducer, getCurrentList } from "../../../../store/reducers/SlotSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useParams } from "react-router-dom";
import { addNewCard, editPositionCard } from "../../../../store/action-creators/CardsActionCreators";
import { fetchLists } from "../../../../store/action-creators/ListsActionCreators";

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
    const [isVisibleSlot, setIsVisibleSlot] = useState<HTMLElement | null>(null)
    const { draggingCard, currentList } = useAppSelector(state => state.slots)
    const [isDraggingElement, setIsDraggindElement] = useState<HTMLElement | null>(null);
    const [isCurrentList, setIsCurrentList] = useState<number | undefined>(undefined);

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
        const draggingElement = e.currentTarget;
        setIsDraggindElement(draggingElement);
        setIsCurrentList(props.id);
        setTimeout(() => {
            draggingElement.classList.add('dragging');
        }, 0)
        dispatch(dragStartReducer(card))
        dispatch(getCurrentList(props.id))
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
        if (!draggingCard) return;
        const slotBefore = e.currentTarget.parentNode.querySelector('.card-clot-before');
        const slotAfter = e.currentTarget.parentNode.querySelector('.card-clot-after');
        const currentCard = e.currentTarget;
        const box = currentCard.getBoundingClientRect();

        if (e.clientY < (box.y + box.height / 2)) {
            if (slotAfter && e.currentTarget.parentNode !== isDraggingElement) {
                isDraggingElement?.classList.add('hidden-card');
                isVisibleSlot?.classList.remove('is-visible');
                slotAfter.classList.add('is-visible');
            }
            setIsVisibleSlot(slotAfter);
        }

        if (e.clientY > (box.y + box.height / 2) && e.currentTarget.parentNode !== isDraggingElement) {
            if (slotBefore) {
                isDraggingElement?.classList.add('hidden-card');
                isVisibleSlot?.classList.remove('is-visible');
                slotBefore.classList.add('is-visible');
            }
            setIsVisibleSlot(slotBefore);
        }
    }

    async function dragDrop(e: any, card: ICard) {
        e.preventDefault();
        isVisibleSlot?.classList.remove('is-visible');
        // console.log(e.currentTarget)
        
        if (!draggingCard) return;
        let indexStart: number;
        let indexEnd: number;
        let isAbove: boolean = draggingCard.position < card.position;

        if (props.id === currentList) {
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
            isDraggingElement?.classList.remove('hidden-card');

            // Повільно працює, треба буде прискорити

            for (let i = indexEnd; i >= indexStart; i--) {
                let position: number;
                if (isAbove) {
                    console.log(cards)
                    position = i === indexStart ? indexEnd + 1 : cards[i].position - 1;
                }
                else {
                    position = i === indexEnd ? indexStart + 1 : cards[i].position + 1;
                }
                await dispatch(editPositionCard({ board_id: Number(board_id), card: [{ id: cards[i].id, position: position, list_id: Number(props.id) }] }));
            }
            console.log("cards1", cards)
        } else {
            let positionNewCard: number;
            if (isVisibleSlot?.classList.contains('card-clot-after')) {
                positionNewCard = card.position + 1;
            } else {
                positionNewCard = card.position;
            }
            await dispatch(addNewCard({ board_id: Number(board_id), card: { title: draggingCard.title, list_id: Number(props.id), position: positionNewCard } }))
            props.deleteCard(draggingCard.id, "card");

            // далі треба змінити позиціювання в тому списку з якого була видалена картка, бо саме через це виникає помилка

            console.log("cards2", cards)
            isDraggingElement?.classList.remove('hidden-card');
            await dispatch(fetchLists(Number(board_id)));
        }
        await dispatch(fetchLists(Number(board_id)));
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
                    createCard={(title: string) => props.createCard(title, "card", props.id, cards)}
                    deleteList={props.deleteList}
                />
            </div>
        </div>);
}
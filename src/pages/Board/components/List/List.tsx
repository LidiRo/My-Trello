import React, { useEffect, useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { Slot } from "../Slot/Slot";

export const List = (props: {
    id?: number;
    title: string;
    cards: ICard[];
    changeTitle: (title: string, list_id: number | undefined, card_id?: number | undefined, namePage?: string) => void;
    createCard: (title: string, namePage: string, list_id?: number, cards?: ICard[], position?: number) => void;
    deleteCard: (id: number | undefined, namePage?: string) => void;
    deleteList: (id: number | undefined, namePage?: string) => void;
}) => {

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

    const [isVisibleSlot, setIsVisibleSlot] = useState<Boolean[]>(cards.map(() => false));
    // console.log("isVisibleSlot ", isVisibleSlot);
    // useEffect(() => {
    //     const containersCards = document.querySelectorAll('.cards');
    //     containersCards.forEach((container: any) => {
    //         container.addEventListener("dragover", (e: any) => {
    //             e.preventDefault();
    //             // const afterElement = getDragAfterElement(container, e.clientY)
    //             // const draggable: any = document.querySelector('.dragging');
    //             // if (draggable !== null) {
    //             //     if (afterElement === null) {
    //             //         container.appendChild(draggable)
    //             //     } else {
    //             //         container.insertBefore(draggable, afterElement);
    //             //     }
    //             // }
    //         })

    // container.addEventListener("drop", (e: any) => {
    //     e.preventDefault();
    // })
    // })

    //     const getDragAfterElement = (container: any, y: number) => {
    //         const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
    //         return draggableElements.reduce((closest: any, child: any) => {
    //             const box = child.getBoundingClientRect();
    //             const offset = y - box.top - box.height / 2;
    //             if (offset < 0 && offset > closest.offset) {
    //                 return { offset: offset, element: child }
    //             } else {
    //                 return closest;
    //             }
    //         }, { offset: Number.NEGATIVE_INFINITY }).element;
    //     }
    // }, [])

    let dragItem: any = null;

    const handleDragStart = (e: any, index: number, card: ICard) => {
        dragItem = e.target;
        e.target.classList.add("dragging");
        e.dataTransfer.setData("text/plain", e.target.innerHTML);
        // console.log("Drag Start", dragItem)
        // console.log("start card", card.position)
        // console.log(cards[index])
        // console.log(e.target.classList.contains("disappear"))
        // setIsVisibleSlot(isVisibleSlot.map((_, i: number) => {
        //     if (i === index) {
        //         return isVisibleSlot[i] = true;
        //     }
        //     return false
        // }))
        // console.log("isVisibleSlot 1 ", isVisibleSlot);
        
    }

    // let isVisibleItem: boolean = true;
    
    // console.log("dragItem 0", dragItem)
    const handleDragLeave = (e: any, index: number, card: ICard) => {
        const currentItem: any = document.querySelector(".dragging");
        // isVisibleItem = false;
        // console.log(isVisibleItem)
        if (currentItem) {
            currentItem.classList.add("disappear")
        }
        // setIsVisibleSlot(isVisibleSlot.map(() => false))
        // console.log("leave card", card)

        // setIsVisibleSlot(isVisibleSlot.map((_, i: number) => {
        //     if (i === index) {
        //         return isVisibleSlot[i] = true;
        //     }
        //     return false
        // }))

        // dragItem.style.display = 'none';
    }

    const handleDragEnter = (e: any, index: number, card: ICard) => {
        console.log(e.target)
        // if (!e.target.hasAttribute("dragging")) {
            
        // }
        // setIsVisibleSlot(isVisibleSlot.map((_, i: number) => {
        //     if (i === index) {
        //         return isVisibleSlot[i] = true;
        //     }
        //     return false
        // }))
    }
    

    const handleDragEnd = (e: any) => {
        e.target.classList.remove("dragging");
        // console.log("Drag End", dragItem)
        // console.log("data2", e.dataTransfer.getData("text/plain"));
        // dragItem = null;
        
        setIsVisibleSlot(isVisibleSlot.map(() => false))
        // console.log("isVisibleSlot 2 ", isVisibleSlot);
    }

    const handleDragOver = (e: any) => {
        e.preventDefault();
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        // console.log("Drop", dragItem)
        // console.log("data2", e.dataTransfer.getData("text/plain"));
        // console.log("Drag Drop", e.target)
        // e.target.append(dragItem);
    }

    // let draggableItems = document.querySelectorAll('.card');

    // draggableItems.forEach((draggable: any, index: number) => {
    //     let indexItem: any;
    //     if (draggable.classList.contains("dragging")) {
    //         indexItem = index;
    //     }
    //     // let dragItem: any = null;
    //     draggable.addEventListener('dragstart', (e: any) => {
    //         // const indexItem = index;
    //         // console.log("dragstart");
    //         dragItem = e.target;
    //         e.target.classList.add("dragging");
    //         // console.log("Drag Start", dragItem)
    //         console.log(indexItem)
    //         setIsVisibleSlot(isVisibleSlot.map((_, i: number) => {
    //             if (i === indexItem) {
    //                 return isVisibleSlot[i] = true;
    //             }
    //             return false
    //         }))
    //         // console.log("isVisibleSlot 1 ", isVisibleSlot);
    //     });

    //     draggable.addEventListener('dragend', (e: any) => { 
    //         e.target.classList.remove("dragging");
    //         // console.log("Drag End", dragItem)
    //         dragItem = null;

    //         setIsVisibleSlot(isVisibleSlot.map(() => false))
    //         // console.log("isVisibleSlot 2 ", isVisibleSlot);
    //     })
    //     // console.log("dragItem 0", dragItem)

    //     draggable.addEventListener('dragleave', (e: any) => { 
    //         // console.log("Drag leave", dragItem)
    //         if (dragItem !== null) {
    //             // dragItem.style.display = 'none';
    //         }
    //     })
    // })



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
            <div className="cards-container"
                onDragOver={(e: any) => { handleDragOver(e) }}
                onDrop={(e: any) => { handleDrop(e) }}>
                <ul
                    className="cards"
                >
                    {cards &&
                        cards.map((card: ICard, index: number) => {
                            return (
                            <li
                                key={card.id}
                                // className="card"
                                // draggable="true"
                                // onDragStart={(e: any) => handleDragStart(e, index, card)}
                                // onDragEnd={(e: any) => handleDragEnd(e)}
                                    
                                >
                                    <div
                                        key={card.id}
                                        id="card"
                                        className="card"
                                        draggable="true"
                                        onDragStart={(e: any) => handleDragStart(e, index, card)}
                                        onDragEnd={(e: any) => handleDragEnd(e)}
                                        onDragLeave={(e: any) => handleDragLeave(e, index, card)}
                                        onDragEnter={(e:any) => handleDragEnter(e, index, card)}
                                    >
                                        <Card
                                            key={card.id}
                                            id={card.id}
                                            listId={Number(props.id)}
                                            title={card.title}
                                            changeTitle={props.changeTitle}
                                            deleteCard={() => props.deleteCard(card.id, "card")}
                                        />
                                    </div>
                                    {isVisibleSlot[index] && 
                                    <div className="slot"> SLOT </div>
                                    }
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









// let listContainers: any;
    // let draggableItem: any;
    // let draggableItems: any;
    // let pointerStartX: number;
    // let pointerStartY: number;
    // let items: any = [];

    // function setup() {
    //     listContainers = document.querySelectorAll('.cards');
    //     draggableItems = document.querySelectorAll('.card');
    //     if (!listContainers) return;
    //     listContainers.forEach((listContainer: any) => {
    //         listContainer.addEventListener('dragstart', dragStart);
    //     })
    //     document.addEventListener('dragend', dragEnd);
    // }

    // function dragStart(e: any) {
    //     if (e.target.classList.contains('card')) {
    //         draggableItem = e.target;
    //     }
    //     if (!draggableItem) return;

    //     pointerStartX = e.clientX;
    //     pointerStartY = e.clientY;

    //     initDraggableItem();
    //     initItemsState();

    //     document.addEventListener('drag', drag);
    // }

    // function drag(e: any) {
    //     if (!draggableItem) return;

    //     const currentPositionX = e.clientX;
    //     const currentPositionY = e.clientY;
    //     const pointerOffsetX = currentPositionX - pointerStartX;
    //     const pointerOffsetY = currentPositionY - pointerStartY;

    //     draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`;

    //     updateIdleItemsStateAndPosition();
    // }

    // function dragEnd() {
    //     if (!draggableItem) return;
        
    //     cleanup();
    // }

    // function getAllItems() {
    //     if (!items?.length) {
    //         items = Array.from(draggableItems);
    //         console.log(items)
    //         // draggableItems.forEach((item: any) => {
    //         //     console.log(item)
    //         //     // console.log(draggableItem)
    //         //     // items = Array.from(listContainer.querySelectorAll(''))
    //         // })
            
    //     }
    //     return items;
    // }

    // function getIdleItems() {
    //     return getAllItems().filter((item: any) => item.classList.contains('is-idle'));
    // }

    // function initItemsState() {
    //     getIdleItems().forEach((item: any, i: any) => {
    //         if (getAllItems().indexOf(draggableItem) > i) {
    //             item.dataset.isAbove = '';
    //         }
    //     })
    // }

    // function initDraggableItem() {
    //     draggableItem.classList.remove('is-idle');
    //     draggableItem.classList.add('is-draggable');
    // }

    // function unsetDraggableItem() {
    //     draggableItem.style = null;
    //     draggableItem.classList.remove('is-draggable');
    //     draggableItem.classList.add('is-idle');
    //     draggableItem = null;
    // }

    // function cleanup() {
    //     unsetDraggableItem();
    //     document.removeEventListener('drag', drag);
    // }

    // function updateIdleItemsStateAndPosition() {
    //     const draggableItemRect = draggableItem.getBoundingClientRect();
    //     const draggableItemY = draggableItemRect.top + draggableItemRect.height / 2;

    //     // Update state
    //     getIdleItems().forEach((item: any) => {
    //         const itemRect = item.getBoundingClientRect()
    //         const itemY = itemRect.top + itemRect.height / 2
    //         if (isItemAbove(item)) {
    //             if (draggableItemY <= itemY) {
    //                 item.dataset.isToggled = ''
    //             } else {
    //                 delete item.dataset.isToggled
    //             }
    //         } else {
    //             if (draggableItemY >= itemY) {
    //                 item.dataset.isToggled = ''
    //             } else {
    //                 delete item.dataset.isToggled
    //             }
    //         }
    //     })

    //     // Update position
    //     getIdleItems().forEach((item: any) => {
    //         if (isItemToggled(item)) {
    //             const direction = isItemAbove(item) ? 1 : -1
    //             item.style.transform = `translateY(${direction * (draggableItemRect.height)
    //                 }px)`
    //         } else {
    //             item.style.transform = ''
    //         }
    //     })
    // }

    // function isItemAbove(item: any) {
    //     return item.hasAttribute('data-is-above')
    // }

    // function isItemToggled(item: any) {
    //     return item.hasAttribute('data-is-toggled')
    // }

    // setup();
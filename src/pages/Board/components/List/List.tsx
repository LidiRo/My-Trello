import React, { useState } from "react";
import './list.scss';
import { Card } from "../Card/Card";
import CreateNewCard from "../Card/CreateNewCard/CreateNewCard";
import { ICard } from "../../../../common/interfaces/ICard";

export const List = (props: {
    id?: number;
    title: string;
    cards?: ICard[];
    changeTitle: (title: string, list_id: number | undefined, card_id?: number | undefined, namePage?: string) => void;
    createCard: (title: string, namePage: string, list_id?: number, cards?: ICard[]) => void;
    deleteCard: (id: number | undefined, namePage?: string) => void;
    deleteList: (id: number | undefined, namePage?: string) => void;
}) => {
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

    
    const draggableCards = document.querySelectorAll('.card');
    const containersCards = document.querySelectorAll('.cards');

    draggableCards.forEach(draggable => {
        draggable.addEventListener("dragstart", () => {
            draggable.classList.add("dragging");
        })

        draggable.addEventListener("dragend", () => {
            draggable.classList.remove("dragging");
        })
    })

    containersCards.forEach((container:any) => {
        container.addEventListener("dragover", (e: any) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable: any = document.querySelector('.dragging');
            if (draggable !== null) {
                if (afterElement === null) {
                    container.appendChild(draggable)
                } else {
                    container.insertBefore(draggable, afterElement);
                }
                // draggable.classList.remove("dragover");
                // draggable.style.border = "none";
            } 
        })

        container.addEventListener("drop", (e: any) => {
            e.preventDefault();
            // const afterElement = getDragAfterElement(container, e.clientY)
            // const draggable: any = document.querySelector('.dragging');
            // if (draggable !== null) {
            //     if (afterElement === null) {
            //         container.appendChild(draggable)
            //     } else {
            //         container.insertBefore(draggable, afterElement);
            //     } 
            // } 
        })

        container.addEventListener("dragenter", (e: any) => { 
            // const draggable: any = document.querySelector('.dragging');
            // // if (e.target.contains(draggable)) {
            // //     draggable.style.border = "2px solid #000";
            // // }  
            
            // draggable.classList.add("dragover");
            // console.log("dragenter", draggable) 
        })  

        container.addEventListener("dragleave", (e: any) => {
            // const draggable: any = document.querySelector('.dragging');
            // // if (e.target.contains(draggable)) {
            // //     draggable.style.border = "none";
            // // }  
            // // draggable.style.border = "none";
            // draggable.classList.remove("dragover");
            // console.log("dragleave", draggable)
        })    
    })   

    const getDragAfterElement = (container: any, y: number) => {
        const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
        return draggableElements.reduce((closest: any, child: any) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
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
                    {props.cards && props.cards.map(el =>
                        <li
                            key={el.id}
                            className="card"
                            draggable="true"
                        >
                            <Card
                                key={el.id}
                                id={el.id}
                                listId={Number(props.id)}
                                title={el.title}
                                changeTitle={props.changeTitle}
                                deleteCard={() => props.deleteCard(el.id, "card")}
                            />
                        </li>
                    )}
                </ul>
            </div>
            <div className="add-card-button-container">
                <CreateNewCard
                    listId={Number(props.id)}
                    createCard={(title: string) => props.createCard(title, "card", props.id, props.cards)}
                    deleteList={props.deleteList}
                />
            </div>
        </div>);
}
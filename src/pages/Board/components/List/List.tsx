import React, { useState } from "react";
import './list.scss';
import { IList } from "../../../../common/interfaces/IList";
import { Card } from "../Card/Card";
import IconDelete from "../../../../images/icon-delete.svg"

export const List = (props: IList) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

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
            <ul className="cards">{props.cards?.map(el => <Card key={el.id} title={el.title} />)}</ul>
            <div className="add-card-button-container">
                <button type="button" className="add-card-button">+ Додати картку</button>
                <span className="del-list-button"><img src={IconDelete} alt="close" /></span>
            </div>

        </div>);
}
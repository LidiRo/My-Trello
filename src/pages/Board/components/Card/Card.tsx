import React, { useState } from "react";
import '../../components/List/list.scss';

export const Card = (props: {
    id: number;
    listId: number;
    title: string;
    changeTitle: (title: string, id: number | undefined, list_id: number | undefined) => void;
    deleteCard: (id: number | undefined, list_id: number | undefined) => void;
}) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const handleBlur = () => {
        setIsMouseEnter(false);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (newTitle !== undefined) {
            props.changeTitle(newTitle, props.id, props.listId)
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

    const handleDelete = () => {
        props.deleteCard(props.id, props.listId);
    }

    return (
        <div>
            {isMouseEnter &&
                <input type="text" defaultValue={props.title} name="title" onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={e => e.target.select()} autoFocus />
            }
            {!isMouseEnter &&
                <div className="card-title-block">
                    <div onClick={handleClickTitle}>
                        {props.title}
                    </div>
                    <button onClick={handleDelete}>Del</button>
                </div>
                }
        </div>
    );
}
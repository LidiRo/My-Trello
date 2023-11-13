import React, { useState } from "react";
import '../../components/List/list.scss';
import IconClose from "../../../../common/images/icone-close.svg"

export const Card = (props: {
    id: number;
    listId: number;
    title: string;
    changeTitle: (title: string, id: number | undefined, list_id: number | undefined, namePage?: string) => void;
    deleteCard: (id: number | undefined, list_id: number | undefined) => void;
}) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const [isCardMenu, setIsCardMenu] = useState(false);

    const handleBlur = () => {
        setIsMouseEnter(false);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (newTitle !== undefined) {
            props.changeTitle(newTitle, props.listId, props.id, "card")
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
        setIsCardMenu(false);
    }

    return (
        <div className="card-container">
            {isMouseEnter &&
                <input
                type="text"
                defaultValue={props.title}
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={e => e.target.select()}
                autoFocus />
            }
            {!isMouseEnter &&
                <div className="card-title-block">
                    <div onClick={handleClickTitle}>
                        {props.title}
                    </div>
                    {!isCardMenu &&
                        <div className="card-menu" onClick={() => setIsCardMenu(true)}>
                            <div className="card-menu-circle"></div>
                            <div className="card-menu-circle"></div>
                            <div className="card-menu-circle"></div>
                        </div>
                    }
                    {isCardMenu &&
                        <div className="card-menu-form">
                            <img src={IconClose} alt="Close" onClick={() => setIsCardMenu(false)} />
                            <button className="card-delete-button" type="button" onClick={handleDelete}>
                                Видалити картку
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
    );
}
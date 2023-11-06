import { useState } from "react";
import IconDelete from "../../../../images/icon-delete.svg"


interface NewCard {
    createCard: (
        title: string,
    ) => void;
    listId: number
}

const CreateNewCard = (props: NewCard) => {
    const [textareaValues, setTextareaValues] = useState('');
    const [isTextareaVisible, setIsTextareaVisible] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleChange = async (e: any) => {
        const newTitle = e.target.value;
        setTextareaValues(newTitle);
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            props.createCard(textareaValues);
            setIsTextareaVisible(false);
        }
    }

    const handleClick = () => {
        setIsTextareaVisible(true);
    }

    const handleBlur = () => {
        setIsTextareaVisible(false);
    }

    return (
        <div className="create-new-card-container">
            {isTextareaVisible &&
                <div className='create-new-card-modal-dialog'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                <textarea name="card" className='create-new-card-modal-textarea' placeholder="Введіть назву картки" onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur} autoFocus />
                            </label>
                        </div>
                    </form>
                </div>
            }
            {!isTextareaVisible &&
                <div className="add-card-button-container">
                    <button type="button" className="add-card-button" onClick={handleClick}>+Додати картку</button>
                    <span className="del-card-button">
                        <img src={IconDelete} alt="close" />
                    </span>
                </div>
                }
        </div>
    )
}

export default CreateNewCard;
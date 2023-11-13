import { useState } from "react";
import IconDelete from "../../../../../common/images/icon-delete-2.png"
import "./CreateNewCard.scss"

interface NewCard {
    listId: number
    createCard: (title: string) => void;
    deleteList: (id: number | undefined, namePage?: string) => void;
}

const CreateNewCard = (props: NewCard) => {
    const [textareaValues, setTextareaValues] = useState('');
    const [isTextareaVisible, setIsTextareaVisible] = useState(false);

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            props.createCard(textareaValues);
            setIsTextareaVisible(false);
        }
    }

    return (
        <div className="create-new-card-container">
            {isTextareaVisible &&
                <div className='create-new-card-modal-dialog'>
                    <form>
                        <div>
                            <label>
                                <textarea
                                    name="card"
                                    className='create-new-card-modal-textarea'
                                    placeholder="Введіть назву картки"
                                    onChange={(e) => setTextareaValues(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={() => setIsTextareaVisible(false)}
                                    autoFocus
                                />
                            </label>
                        </div>
                    </form>
                </div>
            }
            {!isTextareaVisible &&
                <div className="add-card-button-container">
                    <div>
                        <button type="button" className="add-card-button" onClick={() => setIsTextareaVisible(true)}>
                        +Додати картку
                    </button>
                    </div>
                    <div className="card-button-delete" onClick={() => props.deleteList(props.listId, "list")}>
                        <img className="card-button-delete-icon" src={IconDelete} alt="del" />
                        <span className="tooltiptext-card" title="Натисніть, щоб видалити дошку">
                            Натисніть, щоб видалити дошку
                        </span>
                    </div>
                    {/* <span className="del-card-button">
                        <img src={IconDelete} alt="del" />
                    </span> */}
                </div>
                }
        </div>
    )
}

export default CreateNewCard;
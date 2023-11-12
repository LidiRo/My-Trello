import React, { useState } from 'react'
import './CreateNewList.scss'
import IconClose from '../../../../../common/images/icone-close.svg'

interface NewList {
    createList: (title: string, namePage: string) => void
}

const CreateNewList = (props: NewList) => {
    const [inputValues, setInputValues] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.createList(inputValues, "list");
        setIsInputVisible(false);
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            props.createList(inputValues, "list");
            setIsInputVisible(false);
        }
    }

    return (
        <div className="create-new-list-container">
            {isInputVisible &&
                <div className='create-new-list-modal-dialog' onClick={e => { e.stopPropagation() }}>
                    <form onSubmit={handleSubmit}>
                        <div className='create-new-list-modal-body'>
                            <label>
                                <input
                                    type="text"
                                    className='create-new-list-modal-input'
                                    onChange={(e) => setInputValues(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={() => setIsInputVisible(false)}
                                    autoFocus
                                />
                            </label>
                            <div>
                                <button type='submit' className='create-new-list-modal-button'>Додати список</button>
                                <span className='create-new-list-modal-close' onClick={() => setIsInputVisible(false)}>
                                    <img src={IconClose} alt="close" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            }
            {!isInputVisible &&
                <button type="button" className="add-list-button" onClick={() => setIsInputVisible(true)}>
                    +Додати список
                </button>}
        </div>
    )
}

export default CreateNewList
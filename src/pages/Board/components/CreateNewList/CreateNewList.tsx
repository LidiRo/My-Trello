import React, { useState } from 'react'
import './CreateNewList.scss'
import IconClose from '../../../../images/icone-close.svg'

interface NewList {
    createList: (title: string) => void
}

const CreateNewList = (props: NewList) => {
    const [inputValues, setInputValues] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const onClose = () => setIsInputVisible(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.createList(inputValues);
        setIsInputVisible(false);
    }

    const handleChange = async (e: any) => {
        const newTitle = e.target.value;
        setInputValues(newTitle);
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            props.createList(inputValues);
            setIsInputVisible(false);
        }
    }

    const handleClick = () => {
        setIsInputVisible(true);
    }

    const handleBlur = () => {
        setIsInputVisible(false);
    }

    return (
        <div className="create-new-list-container">
            {isInputVisible &&

                <div className='create-new-list-modal-dialog' onClick={e => { e.stopPropagation() }}>
                    <form onSubmit={handleSubmit}>
                        <div className='create-new-list-modal-body'>
                            <label>
                                <input type="text" className='create-new-list-modal-input' onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur} autoFocus/>
                            </label>
                            <div>
                                <button type='submit' className='create-new-list-modal-button'>Додати список</button>
                                <span className='create-new-list-modal-close' onClick={onClose}>
                                    <img src={IconClose} alt="close" />
                                </span>
                            </div>

                        </div>
                    </form>
                </div>

            }
            {!isInputVisible &&
                <button type="button" className="add-list-button" onClick={handleClick}>+Додати список</button>}
        </div>
    )
}

export default CreateNewList
import React, { useState } from 'react'
import './CreateNewList.scss'
import IconPlus from '../../../../../common/images/icon-plus.png'
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
        <div className="list-composer-button-container">
            {!isInputVisible &&
                <button className="list-composer-button" type="button"  onClick={() => setIsInputVisible(true)}>
                    <span className='add-button'>
                        <img src={IconPlus} alt="Plus" className="add-button-icon" />
                    </span>
                    Додати список
                </button>
            }
            {isInputVisible &&
                <div className='list-composer-form-conteiner'>
                    <form className='list-composer-form' onSubmit={handleSubmit}>
                        <textarea
                            className='list-name-textarea'
                            spellCheck='false'
                            maxLength={512}
                            dir='auto'
                            autoComplete='off'
                            name='Увести назву списку...'
                            placeholder='Увести назву списку...'
                            onChange={(e) => setInputValues(e.target.value)}
                            onKeyDown={handleKeyDown}
                            // onBlur={() => setIsInputVisible(false)}
                            autoFocus
                        ></textarea>
                        <div className='list-composer-buttons'>
                            <button className='list-composer-add-list-button' type='submit'>
                                Додати список
                            </button>
                            <button className='list-composer-cancel-button' type='button' onClick={() => setIsInputVisible(false)}>
                                <span className='cancel-button'>
                                    <img className='cancel-button-icon' src={IconClose} alt="close"  />
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default CreateNewList
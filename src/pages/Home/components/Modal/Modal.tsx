import React, { useState } from "react"
import "./modal.scss"

interface IModal {
    visible: boolean;
    onClose: () => void
    createBoard: (title: string) => void
}

export const Modal = (props : IModal) => {
    const [inputValues, setInputValues] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.createBoard(inputValues);
    }


    return (
        <div className='modal' onClick={props.onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h3 className='modal-title'>Створити дошку</h3>
                    <span className='modal-close' onClick={props.onClose}>
                        &times;
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='modal-body'>
                        <label >
                            <input type="text" className='modal-input' value={inputValues} onChange={handleChange} />
                        </label>
                        <button type="submit">Створити</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
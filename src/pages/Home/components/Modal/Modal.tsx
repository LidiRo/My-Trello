import React from "react"
import "./modal.scss"

interface IModal {
    visible: boolean;
    title: string;
    onClose: () => void
    onCreate: () => void
}

export const Modal = ({
    visible = false,
    title = '',
    onClose,
    onCreate
}: IModal) => {
    if (!visible) return null

    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h3 className='modal-title'>{title}</h3>
                    <span className='modal-close' onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className='modal-body'>
                    <label>
                        <input type="text" className='modal-input' />
                    </label>
                    <button type="button" className='modal-button' onClick={onCreate}>Створити</button>
                </div>
            </div>
        </div>
    )
}
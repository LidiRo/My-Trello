import React, { useState, useReducer} from "react"
import "./modal.scss"

interface IModal {
    visible: boolean;
    onClose: () => void
    createBoard: (title: string) => void
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case "ADD_BOARD":
            return [...state, { title: action.payload }]
        default:
            return action.type;
    }
}

export const Modal = ({visible, onClose, createBoard}: IModal) => {
    const [inputValues, setInputValues] = useState('');
    const [boards, dispatch] = useReducer(reducer, []);

    

    const addBoard = async (title: string): Promise<void> => {
        console.log(inputValues);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "ADD_BOARD", payload: inputValues })
        console.log("boards = " + boards.title);
        console.log("inputValues = " + inputValues);
        createBoard(inputValues);
        onClose();
    }



    if (!visible) return null

    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h3 className='modal-title'>Створити дошку</h3>
                    <span className='modal-close' onClick={onClose}>
                        &times;
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='modal-body'>
                        <label>
                            <input type="text" className='modal-input'  value={inputValues} onChange={e => setInputValues(e.target.value)} />
                        </label>
                        <button type="submit">Створити</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
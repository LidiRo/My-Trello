import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import "./CardModal.scss";
import IconClose from '../../../../../common/images/icone-close.svg'
import { showModalCardWindow } from "../../../../../store/reducers/CardSlice";
import { useEffect, useRef } from "react";
import IconPlus from '../../../../../common/images/icon-plus.png'

export const CardModal = () => {

    const { isVisibleCardModal, card, listTitle } = useAppSelector((state) => state.cards);
    const dispatch = useAppDispatch();
    const { custom } = useAppSelector(state => state.lists);



    return (
        <>
            {isVisibleCardModal &&
                <div className="card-modal" >
                    <div className="card-modal-header">
                        <input className="card-modal-title-card"
                            type="text"
                            defaultValue={card?.title}
                            name="title"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        // onKeyDown={handleKeyDown}
                        // onFocus={e => e.target.select()}
                        // autoFocus
                        />
                        <div className="card-modal-title-list">у списку {listTitle}</div>
                        <button
                            className='card-modal-cancel-button'
                            type='button'
                            onClick={() => dispatch(showModalCardWindow(false))}>
                            <span className='cancel-button'>
                                <img className='cancel-button-icon' src={IconClose} alt="close" />
                            </span>
                        </button>
                    </div>
                    <div className="card-modal-main">
                        <div className="card-modal-participants">
                            <h3>Учасники</h3>
                            <div className="card-modal-participants-list">
                                <div className="avatar-participant"></div>
                                <div className="avatar-participant"></div>
                                <div className="avatar-participant"></div>
                                <button className="button-add-participant" type='button'>
                                    <img src={IconPlus} alt="Plus" className="add-button-icon" />
                                </button>
                                <button className='button-join' type='submit'>
                                    Приєднатися
                                </button>
                            </div>
                        </div>
                        <div className="card-modal-description">
                            <h3>Опис</h3>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
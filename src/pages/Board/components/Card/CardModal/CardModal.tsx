import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import "./CardModal.scss";
import IconClose from '../../../../../common/images/icone-close.svg'
import { showModalCardWindow } from "../../../../../store/reducers/CardSlice";
import { useEffect, useRef, useState } from "react";
import IconPlus from '../../../../../common/images/icon-plus.png'
import { Link, useParams } from "react-router-dom";
import { editDescriptionCard, editTitleCard } from "../../../../../store/action-creators/CardsActionCreators";
import { fetchLists } from "../../../../../store/action-creators/ListsActionCreators";

export const CardModal = () => {
    let { board_id } = useParams();
    const { isVisibleCardModal, card, listTitle, listId } = useAppSelector((state) => state.cards);
    const [isVisibleModal, setIsVisibleModal] = useState(document.location.pathname === `/board/${board_id}` ? false : true);

    const dispatch = useAppDispatch();
    const { custom } = useAppSelector(state => state.lists);
    const [isVisibleTextarea, setIsVisibleTextarea] = useState(false);
    const PATTERN = new RegExp(/^[0-9a-zA-Zа-яА-ЯіІ\s\-_.]+$/i);
    const [textareaValues, setTextareaValues] = useState("");

    // console.log(isVisibleModal)
    // useEffect(() => {
    //     // if (isVisibleCardModal) {
    //     //     setIsVisibleModal(true);
    //     // }
    //     console.log("isVisibleModal", isVisibleModal)
    //     setTimeout(() => {
    //         if (isVisibleCardModal) {
    //         setIsVisibleModal(true);
    //     }
    //     }, 0);
    //     // console.log(card)
    // }, [isVisibleCardModal, isVisibleModal])
    
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (newTitle === undefined || newTitle === "" || !PATTERN.test(newTitle)) return;
        await dispatch(editTitleCard({ board_id: Number(board_id), card_id: Number(card?.id), list_id: Number(listId), title: newTitle }));
        await dispatch(fetchLists(Number(board_id)));
    }

    const handleBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (newTitle === undefined || newTitle === "" || !PATTERN.test(newTitle)
            // || newTitle === card?.title
        ) return;
        await dispatch(editTitleCard({ board_id: Number(board_id), card_id: Number(card?.id), list_id: Number(listId), title: newTitle }));
        await dispatch(fetchLists(Number(board_id)));
    }

    const handleKeyDown = async (e: any) => {
        if (e.key === "Enter") {
            setTimeout(() => {
                document.querySelector('input')?.blur();
            }, 0);
        }
    }

    const editDescription = async (e: any) => {
        setIsVisibleTextarea(false)
        const description = e.target.value;
        if (description === undefined || description === "" || !PATTERN.test(description)) return;
        await dispatch(editDescriptionCard({ board_id: Number(board_id), id: Number(card?.id), description: description, list_id: Number(listId) }))
        await dispatch(fetchLists(Number(board_id)));
    }
    // console.log(textareaValues)
    // console.log(card)
    // console.log("listId", listId, "card?.id", card?.id)

    return (
        <>
            {
                isVisibleCardModal &&
                <div className="window-up">
                    <div className="card-modal" >
                        <div className="card-modal-header">
                            <input className="card-modal-title-card"
                                type="text"
                                defaultValue={card?.title}
                                name="title"
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="card-modal-title-list">у списку {listTitle}</div>
                            <Link className="link" to={`/board/${board_id}`}>
                                <button
                                    className='card-modal-cancel-button'
                                    type='button'
                                    onClick={() => {
                                        dispatch(showModalCardWindow(false));
                                    }}>
                                    <span className='cancel-button'>
                                        <img className='cancel-button-icon' src={IconClose} alt="close" />
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div className="card-modal-main">
                            <div className="card-modal-information">
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
                                    <div>
                                        {card?.description && !isVisibleTextarea &&
                                            <div
                                                className="card-description"
                                                onClick={() => setIsVisibleTextarea(true)}
                                            >
                                                {card.description}
                                            </div>
                                        }
                                        {!card?.description && !isVisibleTextarea &&
                                            <div
                                                className="description-fake-textarea"
                                                onClick={() => setIsVisibleTextarea(true)}
                                            >Додати детальніший опис...</div>
                                        }
                                        {isVisibleTextarea &&
                                            <div>
                                                <textarea
                                                    className='description-textarea'
                                                    spellCheck='false'
                                                    maxLength={512}
                                                    dir='auto'
                                                    autoComplete='off'
                                                    name='Додати детальніший опис...'
                                                    placeholder='Додати детальніший опис...'
                                                    defaultValue={card?.description}
                                                    // onChange={(e) => setTextareaValues(e.target.value)}
                                                    // onKeyDown={handleKeyDown}
                                                    onBlur={(e: any) => editDescription(e)}
                                                    autoFocus
                                                >
                                                    {/* {card?.description} */}
                                                </textarea>
                                                <div>
                                                    <button
                                                        className="button-save"
                                                        type="button"
                                                    // onClick={(e: any) => editDescription(e)}
                                                    >
                                                        Зберегти
                                                    </button>
                                                    <button
                                                        className="button-cancel"
                                                        type="button"
                                                        onClick={() => setIsVisibleTextarea(false)}>
                                                        Відмінити
                                                    </button>
                                                </div>
                                            </div>


                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="card-modal-sidebar">
                                <h3>Дії</h3>
                                <div className="card-modal-sidebar-buttons">
                                    <button className='button-copy' type='submit'>
                                        Копіювання
                                    </button>
                                    <button className='button-move' type='submit'>
                                        Переміщення
                                    </button>
                                    <button className='button-archive' type='submit'>
                                        Архівація
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                
            }
        </>
    )
}
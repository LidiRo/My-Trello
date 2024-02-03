import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import "./CardModal.scss";
import IconClose from '../../../../../common/images/icone-close.svg'
import { showModalCardWindow, closeModalCardWindow } from "../../../../../store/reducers/CardSlice";
import { useEffect, useRef, useState } from "react";
import IconPlus from '../../../../../common/images/icon-plus.png'
import { Link, useNavigate, useParams } from "react-router-dom";
import { editDescriptionCard, editTitleCard } from "../../../../../store/action-creators/CardsActionCreators";
import { fetchLists } from "../../../../../store/action-creators/ListsActionCreators";
import { IList } from "../../../../../common/interfaces/IList";
import { ICard } from "../../../../../common/interfaces/ICard";
import { IBoard } from "../../../../../common/interfaces/IBoard";
import { fetchBoards } from "../../../../../store/action-creators/BoardsActionCreators";

export const CardModal = () => {

    let { board_id } = useParams();
    let { card_id } = useParams();

    const dispatch = useAppDispatch();
    const loc = document.location;
    const PATTERN = new RegExp(/^[0-9a-zA-Zа-яА-ЯіІ\s\-_.]+$/i);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [isVisibleCopyModal, setIsVisibleCopyModal] = useState(false);
    const { lists, title } = useAppSelector(state => state.lists);
    const { boards } = useAppSelector(state => state.boards);
    const [isVisibleTextarea, setIsVisibleTextarea] = useState(false);
    const [cardTitle, setCardTitle] = useState("");
    const [listTitle, setListTitle] = useState("");
    const [listId, setListId] = useState(0);
    const [description, setDescription] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [selectListTitle, setSelectListTitle] = useState(listTitle);
    const [cardPosition, setCardPosition] = useState(0);
    const [selectList, setSelectList] = useState<ICard[]>([]);
    const [currentCardPosition, setCurrentCardPosition] = useState(0);
    const [currentList, setCurrentList] = useState<IList>();

    useEffect(() => {

        setTimeout(() => {
            if (loc.pathname !== `/board/${board_id}`) {
                setIsVisibleModal(true);
            }
            dispatch(fetchBoards());
        }, 0);

        lists.forEach((list: IList) => {
            list.cards.forEach((card: ICard) => {
                if (card.id === Number(card_id)) {
                    setCardTitle(card.title);
                    setListTitle(list.title);
                    setListId(Number(list.id));
                    setDescription(card.description);
                    setCardPosition(card.position);
                    setCurrentCardPosition(card.position)
                    setSelectList(list.cards);
                    // setCurrentList(list);

                }
                // if (listTitle !== selectListTitle) {

                //     // setCurrentList(list);
                    // console.log("cards.length", currentList?.cards.length);
                // }
            })
        })
        setBoardTitle(title);
        setSelectListTitle(listTitle)
        // boards.forEach((board: IBoard) => {
        //     if (board_id === board.id) {
        //         setBoardTitle(board.title);
        //     }
        // })

    }, [board_id, isVisibleModal, loc.pathname, lists, card_id, dispatch, title, listTitle])

    // console.log("cardTitle", cardTitle);
    // console.log("listTitle", listTitle);
    // console.log("selectList", selectList);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (newTitle === undefined || newTitle === "" || !PATTERN.test(newTitle)) return;
        await dispatch(editTitleCard({ board_id: Number(board_id), card_id: Number(card_id), list_id: Number(listId), title: newTitle }));
        await dispatch(fetchLists(Number(board_id)));
    }

    const handleBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (newTitle === undefined || newTitle === "" || !PATTERN.test(newTitle)
            // || newTitle === card?.title
        ) return;
        await dispatch(editTitleCard({ board_id: Number(board_id), card_id: Number(card_id), list_id: Number(listId), title: newTitle }));
        await dispatch(fetchLists(Number(board_id)));
    }

    const handleKeyDown = async (e: any) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setTimeout(() => {
                document.querySelector('input')?.blur();
            }, 0);
        }
        // if (e.key === "Escape") {
        //     setIsVisibleModal(false)
        // }
    }

    const editDescription = async () => {
        setIsVisibleTextarea(false)
        // const description = e.target.value;
        if (description === undefined || description === "" || !PATTERN.test(description)) return;
        await dispatch(editDescriptionCard({ board_id: Number(board_id), id: Number(card_id), description: description, list_id: Number(listId) }))
        await dispatch(fetchLists(Number(board_id)));
    }
    // console.log(textareaValues)
    // console.log(description)
    // console.log("listId", listId, "card?.id", card?.id)

    // window.onclick = function (e: any) {
    //     const modal = document.getElementsByClassName("window-up");
    //     console.log(modal)
    //     console.log(e.target)
    //     if (e.target === modal) {
    //         setIsVisibleModal(false);
    //     }
    // }

    const gettingBoardTitle = () => {
        let sel = document.querySelector(".select-board") as HTMLSelectElement;
        setBoardTitle(sel.value);
    }

    const gettingListTitle = () => {
        let sel = document.querySelector(".select-list") as HTMLSelectElement;
        setSelectListTitle(sel.value);
        // console.log("value", sel.value);
        lists.forEach((list: IList) => {
            // console.log("list", list);
            if (sel.value === list.title) {
                setCurrentList(list);
                setCardPosition(list.cards.length);
                // console.log("cards.length", list.cards.length);
            } 
            if (sel.value === listTitle) {
                setCardPosition(currentCardPosition);
            }
        })
    }

    const gettingCardPosition = () => {
        let sel = document.querySelector(".select-position") as HTMLSelectElement;
        setCardPosition(Number(sel.value));
        // if (selectListTitle !== listTitle) {
        //     console.log("OK",sel.selectedIndex); 
        // }
    }



    return (
        <>
            {
                isVisibleModal &&
                <div className="window-up" >
                    <div className="card-modal" >
                        <div className="card-modal-header">
                            <input className="card-modal-title-card"
                                type="text"
                                defaultValue={cardTitle}
                                name="title"
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="card-modal-title-list">у списку {listTitle}</div>
                            <Link className="link" to={`/board/${board_id}`}>
                                <button
                                    className='card-modal-cancel-button'
                                    type='button'
                                    onClick={() => { setIsVisibleModal(false) }}
                                // onKeyDown={handleKeyDown}
                                >
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
                                    <div className="card-modal-description-header">
                                        <h3>Опис</h3>
                                        {description &&
                                            <button
                                                className='button-edit'
                                                type='button'
                                                onClick={() => setIsVisibleTextarea(true)}
                                            >
                                                Редагувати
                                            </button>
                                        }
                                    </div>
                                    <div>
                                        {
                                            description &&
                                            !isVisibleTextarea &&
                                            <div
                                                className="card-description"
                                                onClick={() => setIsVisibleTextarea(true)}
                                            >
                                                {description}
                                            </div>
                                        }
                                        {
                                            !description &&
                                            !isVisibleTextarea &&
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
                                                    defaultValue={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    // onKeyDown={handleKeyDown}
                                                    onBlur={() => editDescription()}
                                                    onFocus={e => e.target.select()}
                                                    autoFocus
                                                ></textarea>
                                                <div>
                                                    <button
                                                        className="button-save"
                                                        type="button"
                                                        onClick={() => editDescription()}
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
                                    <button className='button-copy' type='submit' onClick={() => { setIsVisibleCopyModal(true) }}>
                                        Копіювати
                                    </button>
                                    <button className='button-move' type='submit'>
                                        Перемістити
                                    </button>
                                    <button className='button-archive' type='submit'>
                                        Архівувати
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    {isVisibleCopyModal &&
                        <div className="copy-modal">
                            <div className="copy-modal-header">
                                <h3 className="copy-modal-title">Копіювати картку</h3>
                                <button
                                    className="copy-modal-cancel-button"
                                    type='button'
                                    onClick={() => { setIsVisibleCopyModal(false) }}
                                >
                                    <span className='cancel-button'>
                                        <img className='cancel-button-icon' src={IconClose} alt="close" />
                                    </span>
                                </button>
                            </div>
                                <form className="form-select">
                                <label>Назва</label>
                                <textarea
                                    className='copy-modal-card-title-textarea'
                                    spellCheck='false'
                                    maxLength={512}
                                    dir='auto'
                                    autoComplete='off'
                                    name='Назва картки'
                                    placeholder='Назва картки'
                                    defaultValue={cardTitle}
                                    // onChange={(e) => setDescription(e.target.value)}
                                    // onKeyDown={handleKeyDown}
                                    // onBlur={() => editDescription()}
                                    onFocus={e => e.target.select()}
                                    autoFocus
                                ></textarea>
                                <label>Скопіювати в...</label>
                                <div className="form-select-board button-link">
                                    <span className="label">Дошка</span>
                                    <span className="value board-value">{boardTitle}</span>
                                    <label>Дошка</label>
                                    <select name="select-board" className="select-board" onChange={gettingBoardTitle}>
                                        {boards &&
                                            boards.map((board: IBoard) => {
                                                if (board.title === title) {
                                                    return (
                                                        <option value={board.title} key={board.id}>{board.title} (поточна)</option>
                                                    )
                                                }
                                                return (
                                                    <option value={board.title} key={board.id} >{board.title}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-select-list-and-position">
                                    <div className="form-select-list button-link">
                                        <span className="label">Список</span>
                                        <span className="value board-value">{selectListTitle}</span>
                                        <label>Список</label>
                                        <select name="select-list" className="select-list" onChange={gettingListTitle}>
                                            {lists &&
                                                    lists.map(list => {
                                                    if (list.title === listTitle) {
                                                        return (
                                                            <option value={list.title} key={list.id}>{list.title} (поточний)</option>
                                                        )
                                                    }
                                                    return (
                                                        <option value={list.title} key={list.id}>{list.title}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-select-position button-link">
                                        <span className="label">Позиція</span>
                                        <span className="value board-value">{cardPosition}</span>
                                        <label>Позиція</label>
                                        <select name="select-position" className="select-position" onChange={gettingCardPosition}>
                                            {selectList &&
                                                selectList.map(card => {
                                                    if (card.position === currentCardPosition) {
                                                        return (
                                                            <option value={card.position} key={card.id}>{card.position} (поточна)</option>
                                                        )
                                                    }
                                                    // if (listTitle !== selectListTitle) {
                                                    //     console.log(selectList.length)
                                                    //     return (
                                                    //         <option value={selectList.length} key={card.id}>{selectList.length}</option>
                                                    //     )
                                                    // }
                                                    return (
                                                        <option value={card.position} key={card.id}>{card.position}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <button className="form-create-card">Створити картку</button>
                            </form>
                            {/* <div className="copy-modal-card-title-block">
                                    <h4>Назва</h4>
                                    <textarea
                                        className='copy-modal-card-title-textarea'
                                        spellCheck='false'
                                        maxLength={512}
                                        dir='auto'
                                        autoComplete='off'
                                        name='Назва картки'
                                        placeholder='Назва картки'
                                        defaultValue={cardTitle}
                                        // onChange={(e) => setDescription(e.target.value)}
                                        // onKeyDown={handleKeyDown}
                                        // onBlur={() => editDescription()}
                                        onFocus={e => e.target.select()}
                                        autoFocus
                                    ></textarea>
                                </div> */}
                        </div>
                    }
                </div>
            }
        </>
    )
}
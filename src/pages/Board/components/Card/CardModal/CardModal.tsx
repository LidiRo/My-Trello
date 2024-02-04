import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import "./CardModal.scss";
import IconClose from '../../../../../common/images/icone-close.svg'
import { showModalCardWindow, closeModalCardWindow } from "../../../../../store/reducers/CardSlice";
import { useEffect, useRef, useState } from "react";
import IconPlus from '../../../../../common/images/icon-plus.png'
import { Link, useNavigate, useParams } from "react-router-dom";
import { addNewCard, editDescriptionCard, editTitleCard } from "../../../../../store/action-creators/CardsActionCreators";
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
    const [newCardTitle, setNewCardTitle] = useState("");
    const [listTitle, setListTitle] = useState("");
    const [listId, setListId] = useState(0);
    const [newListId, setNewListId] = useState(listId);
    const [description, setDescription] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [selectListTitle, setSelectListTitle] = useState(listTitle);
    const [cardPosition, setCardPosition] = useState(0);
    const [currentCards, setCurrentCards] = useState<ICard[]>([]);
    const [currentCardPosition, setCurrentCardPosition] = useState(0);


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
                    setNewCardTitle(card.title)
                    setListTitle(list.title);
                    setListId(Number(list.id));
                    setNewListId(Number(list.id));
                    setDescription(card.description);
                    setCardPosition(card.position);
                    setCurrentCardPosition(card.position)
                    setCurrentCards(list.cards);
                }
            })
        })
        setBoardTitle(title);
        setSelectListTitle(listTitle)

    }, [board_id, isVisibleModal, loc.pathname, lists, card_id, dispatch, title, listTitle])


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (newTitle === undefined || newTitle === "" || !PATTERN.test(newTitle)) return;
        setNewCardTitle(newTitle);
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

    const gettingBoardTitle = () => {
        let sel = document.querySelector(".select-board") as HTMLSelectElement;
        setBoardTitle(sel.value);
    }

    const gettingListTitle = () => {
        let sel = document.querySelector(".select-list") as HTMLSelectElement;
        setSelectListTitle(sel.value);
        lists.forEach((list: IList) => {
            if (sel.value === list.title) {
                setCardPosition(list.cards.length + 1);
                setCurrentCards(list.cards);
                setNewListId(Number(list.id));
            }
            if (sel.value === listTitle) {
                setCardPosition(currentCardPosition);
            }
        })

    }

    const gettingCardPosition = () => {
        let sel = document.querySelector(".select-position") as HTMLSelectElement;
        setCardPosition(Number(sel.value));
    }
    
    const handleCopyCard = async () => {
        await dispatch(addNewCard({ board_id: Number(board_id), card: { title: newCardTitle, list_id: newListId, position: cardPosition}}));
        await dispatch(fetchLists(Number(board_id)));
    }
console.log("title: ", newCardTitle, "list_id: ", newListId, "position: ", cardPosition)
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
                                    // onChange={handleChange}
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
                                        onChange={(e: any) => handleChange(e)}
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
                                            {currentCards &&
                                                currentCards.map(card => {
                                                    if (card.position === currentCardPosition) {
                                                        return (
                                                            <option value={card.position} key={card.id}>{card.position} (поточна)</option>
                                                        )
                                                    }
                                                    return (
                                                        <option value={card.position} key={card.id}>{card.position}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <button className="form-create-card" onClick={handleCopyCard}>Створити картку</button>
                            </form>
                        </div>
                    }
                </div>
            }
        </>
    )
}
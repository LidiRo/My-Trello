import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import './board.scss';
import { List } from "./components/List/List";
import { IList } from "../../common/interfaces/IList";
import instance from "../../api/request";

const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const Board = () => {

    const [lists, setLists] = useState<IList[]>([]);
    const [title, setTitle] = useState('');
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    let { board_id } = useParams();

    interface Board {
        title: string;
        list: IList[];
        custom: { background: string };
    }

    useEffect(() => {
        const fetchData = async () : Promise<void> => {
            const board: Board = await instance.get(`/board/${board_id}`);
            setLists(board.list);
            setTitle(board.title);
        }
        fetchData();
    }, [])

    // console.log("title 1 = ", title)

    const handleBlur = () => {
        setIsMouseEnter(false);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        changeTitle(newTitle);
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            setIsMouseEnter(false);
        }
    }

    const changeTitle = async (title: string): Promise<void> => {
        if (title !== "" && PATTERN.test(title)) {
            try {
                await instance.put(`/board/${board_id}`, { title: title });
                const fetchData: { title: string } = await instance.get(`/board/${board_id}`);
                setTitle(fetchData.title);
            } catch (err: any) {
                console.log(`Error: ${err.message}`);
            }
        }

        // console.log("title 2 = ", title)
    }

    return (
        <div className="board-container">
            <div className="board-header">
                <Link to={'/'}>
                    <button type="button" className="back-home-button">Додому</button>
                </Link>
                <div className="board-title">
                    {isMouseEnter && <input type="text" defaultValue={title} name="title" onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={e => e.target.select()} autoFocus />}
                    {!isMouseEnter &&
                        <h1
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onClick={() => setIsMouseEnter(true)}>
                            {title}
                        </h1>}
                </div>
            </div>
            <div className="lists-container">
                <div className="lists">
                    {!lists || lists.map((list) => (
                        <div key={list.id}>
                            <List key={list.id} title={list.title} cards={list.cards} />
                        </div>
                    ))}
                </div>
                <div className="add-list-button-container">
                    <button type="button" className="add-list-button">+ Додати список</button>
                </div>
            </div>
        </div>
    );
}
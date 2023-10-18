import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import './board.scss';
import { List } from "./components/List/List";
import { IList } from "../../common/interfaces/IList";
import instance from "../../api/request";
import postData from "../../common/requests/postData";
import CreateNewList from "./components/CreateNewList/CreateNewList";

const PATTERN = new RegExp(/^[0-9A-ZА-ЯЁ\s\-_.]+$/i);

export const Board = () => {

    const [lists, setLists] = useState<IList[]>([]);
    const [title, setTitle] = useState('');
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const [inputValues, setInputValues] = useState('');

    let { board_id } = useParams();
    
    interface Board {
        title: string;
        lists: IList[];
        custom: { background: string };
    }

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const board: Board = await instance.get(`/board/${board_id}`);
                console.log("board.list", board.lists)

                if (board.lists !== undefined) {
                    setLists(board.lists);
                }
                setTitle(board.title);
            } catch (err: any) {
                console.log(`Error: ${err.message}`);
            }
            
        }
        fetchData();
    }, [])
    console.log("lists", lists)
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
    }

    const createList = async (titleList: string) => {
        try {
            if (titleList !== "" && PATTERN.test(titleList)) {
                const list = { title: titleList, position: lists?.length ? lists.length + 1 : 1 };
                await instance.post(`/board/${board_id}/list`, list)
            }

            const fetchData: { lists: IList[] } = await instance.get(`/board/${board_id}`);
            setLists(fetchData.lists);
        } catch (err: any) {
            console.log(`Error: ${err.message}`)
        }
    }

    const handleDelete = async (id: number | undefined) => {
        try {
            await instance.delete(`/board/${board_id}/list/${id}`);
            const data = lists?.filter(list => list.id !== id);
            if (data !== undefined) {
                setLists(data);
            }
            
        } catch (err: any) {
            console.log(`Error: ${err.message}`);
        }
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
                            <button type="button" onClick={() => handleDelete(list.id)}>Delete</button>
                        </div>
                    ))}
                </div>
                <CreateNewList createList={createList} />
            </div>
        </div>
    );
}
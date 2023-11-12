import { ReactElement } from "react";
import "./board-home.scss";

export const BoardHome = (props: {
    title: string,
    background?: string,
}): ReactElement => {
    const { title, background } = props;

    return (
        <div>
            <div className="board-home-container" style={background ? { backgroundColor: background } : { backgroundColor: "#D4E2EE"}}>
                <div className="board-home-title">{title}</div>
            </div>
        </div>
    )
};
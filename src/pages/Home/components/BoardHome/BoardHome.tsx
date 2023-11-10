import "./board-home.scss";

export const BoardHome = (props: {
    title: string,
    background?: string,
    custom?: { background?: string }
}) => {

    return (
        <div>
            <div className="board-home-container">
                <div className="board-home-title">{props.title}</div>
            </div>
        </div>
    )
};
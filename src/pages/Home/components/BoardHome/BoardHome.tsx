import "./board-home.scss";

export const BoardHome = (props: {
    title: string,
    background?: string,
}) => {

    return (
        <div>
            <div className="board-home-title">
                <div >{props.title}</div>
            </div>
        </div>
    )
};
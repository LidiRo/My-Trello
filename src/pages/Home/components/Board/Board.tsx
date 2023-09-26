import React from "react";
import "../board.scss";

export const BoardHome = (props: { title: string, background: string, border: string }) => (
    <div className="board-home-title">{ props.title }</div>
);
import React from "react";
import "./board-home.scss";

export const BoardHome = (props: { title: string, background: string, border: string }) => (
    <div className="board-home-title">{ props.title }</div>
);
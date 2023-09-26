import React from "react";
import '../list.scss';

export const Card = (props: { title: string }) => (
    <div className="card-title">{ props.title }</div>
);
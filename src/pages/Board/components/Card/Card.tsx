import React from "react";
import '../../components/List/list.scss';

export const Card = (props: {title: string }) => (
    <div className="card-title">{ props.title }</div>
);
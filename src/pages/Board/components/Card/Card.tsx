import React from "react";
import '../list.scss';

export const Card = ({ title }: { title: string }) => (
    <div className="card-title">{ title }</div>
);
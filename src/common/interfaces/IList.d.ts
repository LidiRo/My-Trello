import { ICard } from "../../../../common/interfaces/ICard";

export interface IList {
    id?: number;
    title: string;
    cards: ICard[];
    position: number;
}
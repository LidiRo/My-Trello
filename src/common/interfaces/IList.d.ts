import { ICard } from "../../../../common/interfaces/ICard";

export interface IList {
    id?: number;
    title: string;
    cards?: ICard[];
    changeTitle: (title: string, id: number | undefined) => void;
}
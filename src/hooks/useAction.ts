import { useDispatch } from "react-redux"
import * as BoardActionCreators from '../action-creators/boardActionCreator' 
import { bindActionCreators } from "redux";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(BoardActionCreators, dispatch);
}
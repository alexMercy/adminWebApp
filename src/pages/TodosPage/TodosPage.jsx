import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchTodos, selectorsTodo} from "../../store/todo";
import {TodoColumns} from "../../components/TodoColumns/TodoColumns";
import video from "../../videos/todosBack.mp4";
import {Title} from "../../components/Title/Title";



export const TodosPage = () => {

    const itemIds = useSelector(selectorsTodo.selectIds);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos())
    }, []);

    if (!itemIds.length) return ;

    return(
        <>
            <div style={{marginBottom:20}}><Title video={video} title="Todos"/></div>
            <TodoColumns/>
        </>
    );

};
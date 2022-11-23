import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {actionsTodo, selectorsTodo} from "../../store/todo";

export const TodosPage = () => {
    const dispatch = useDispatch();
    const todoEntities = useSelector(selectorsTodo.selectEntities);
    const todoIds = useSelector(selectorsTodo.selectIds);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then(response => {
                dispatch(actionsTodo.addTodos(response.data));
            });
    }, []);

    return (
        <div>
            {todoIds.map(id => (
                <div key={id}>{todoEntities[id].title}</div>
            ))}
        </div>
    );
};
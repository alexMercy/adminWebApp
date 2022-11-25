import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchTodos, selectorsTodo} from "../../store/todo";
import {Todos} from "../../components/Todos/Todos";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Card, Typography} from "antd";
import {TodoColumn} from "../../components/TodoColumn/TodoColumn";

export const TodosPage = () => {
    const dispatch = useDispatch();
    const itemIds = useSelector(selectorsTodo.selectIds);
    const items = useSelector(selectorsTodo.selectEntities);

    useEffect(() => {
        dispatch(fetchTodos())
    }, []);

    // const items = [
    //     {id: "1", name: "Fuck"},
    //     {id: "2", name: "Nice"},
    //     {id: "3", name: "Meme"},
    //
    // ]

    if (!itemIds.length) return;

    const columns = [
        {
            id: "1",
            title: "inProgress",
            items: []
        },
        {
            id: "2",
            title: "Completed",
            items: []
        }
    ];

    itemIds.map(itemId =>
    {
        items[itemId].completed ? columns[1].items.push(items[itemId]) : columns[0].items.push(items[itemId]);
    })



    const onDragEnd = () => {};

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((column) => (
                    <TodoColumn key={column.id} column={column}/>
                ))}
                {/*<Todos key={id} todoId={id}/>*/}
            </DragDropContext>
        </div>
    );
};
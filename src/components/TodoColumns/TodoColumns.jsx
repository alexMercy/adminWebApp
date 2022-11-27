import {DragDropContext} from "react-beautiful-dnd";
import {Col, Row} from "antd";
import _ from "lodash";
import { v4 as uuid } from 'uuid';
import {TodoColumn} from "../TodoColumn/TodoColumn";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodo,
    deleteTodo,
    selectorIsTodoSuccess,
    selectorsTodo,
    updateTodo
} from "../../store/todo";
import {CreateTodoItem} from "../CreateTodoItem/CreateTodoItem";

function filterItems(itemIds, items) {

    const filteredItems = {
        completed: [],
        inProgress: []
    }
    itemIds.map(itemId =>
    {
        items[itemId].completed
            ? filteredItems.completed.push(items[itemId])
            : filteredItems.inProgress.push(items[itemId])
    })
    return filteredItems;
}

export const TodoColumns = () => {

    const itemIds = useSelector(selectorsTodo.selectIds);
    const items = useSelector(selectorsTodo.selectEntities);

    const isTodoSuccess = useSelector(selectorIsTodoSuccess);

    const dispatch = useDispatch();

    const [columns, setColumns] = useState({
        inProgress: {
            title: "in Progress",
            items: []
        },
        completed: {
            title: "Completed",
            items: []
        }
    });

    useEffect(() => {
        const filteredItems = filterItems(itemIds, items);
        setColumns(prevState => {
            prevState = {...prevState};
            prevState.completed.items.push(...filteredItems.completed);
            prevState.inProgress.items.push(...filteredItems.inProgress);
            return prevState;
        });
    }, []);

    const onDragEnd = ({destination, source}) => {

        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId))
            return;

        const itemCopy = {...columns[source.droppableId].items[source.index]};

        itemCopy.completed = !itemCopy.completed;

        dispatch(updateTodo(itemCopy));

        if (isTodoSuccess) {
            setColumns(prevState => {
                prevState = {...prevState};
                prevState[source.droppableId].items.splice(source.index, 1);
                prevState[destination.droppableId].items.splice(destination.index, 0, itemCopy);
                return prevState;
            })
        }
    };

    const onDeleteClick = (item, droppableId, index) => {

        const itemCopy = {...columns[droppableId].items[index]};
        dispatch(deleteTodo(itemCopy));

        if (isTodoSuccess) {
            setColumns(prevState => {
                prevState = {...prevState};
                prevState[droppableId].items.splice(index, 1);
                return prevState;
            })
        }
    }

    const onAddClick = (item) => {

        const dataItem = {
            userId: uuid(),
            id: uuid(),
            title: item.text,
            completed: item.tag.status === "COMPLETED"
        }

        dispatch(addTodo(dataItem));


        if (isTodoSuccess) {
            const droppableId = item.tag.status === "COMPLETED" ? "completed" : "inProgress";

            setColumns(prevState => {
                prevState = {...prevState};
                prevState[droppableId].items.push(dataItem);
                return prevState;
            })
        }

    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Row>
                    <Col span={4}/>
                    <>
                        {_.map(columns, (data, key) => (
                            <TodoColumn key={key} data={data} droppableId={key} onDeleteClick={onDeleteClick}/>
                        ))}
                    </>
                    <Col span={1}/>
                    <Col span={4}>
                        <CreateTodoItem onAddClick={onAddClick}/>
                    </Col>
                </Row>
            </DragDropContext>
        </div>
    );
}